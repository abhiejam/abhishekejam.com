// Re-encodes the AirMic launch video for the web and extracts its poster frame.
// Uses only macOS frameworks, so no ffmpeg is needed.
//
// Usage:
//   swift scripts/airmic-video.swift <source.mp4> [width] [bitrate]
//
// Writes public/airmic/airmic-demo.mp4 (H.264, no audio, fast start) and
// public/airmic/airmic-demo-poster.jpg (the first frame).

import AVFoundation
import AppKit

let args = CommandLine.arguments
guard args.count >= 2 else {
  print("usage: swift scripts/airmic-video.swift <source.mp4> [width=720] [bitrate=900000]")
  exit(1)
}

let sourceURL = URL(fileURLWithPath: args[1])
let targetWidth = args.count > 2 ? Int(args[2])! : 720
let bitrate = args.count > 3 ? Int(args[3])! : 900_000
let outDir = URL(fileURLWithPath: "public/airmic", isDirectory: true)
let videoURL = outDir.appendingPathComponent("airmic-demo.mp4")
let posterURL = outDir.appendingPathComponent("airmic-demo-poster.jpg")

let asset = AVURLAsset(url: sourceURL)

func run() async throws {
  guard let track = try await asset.loadTracks(withMediaType: .video).first else {
    throw NSError(domain: "airmic", code: 1, userInfo: [NSLocalizedDescriptionKey: "no video track"])
  }
  let (naturalSize, transform, frameRate) = try await track.load(
    .naturalSize, .preferredTransform, .nominalFrameRate)
  let oriented = naturalSize.applying(transform)
  let sourceSize = CGSize(width: abs(oriented.width), height: abs(oriented.height))
  // H.264 needs even dimensions.
  let width = targetWidth / 2 * 2
  let height = Int((CGFloat(targetWidth) * sourceSize.height / sourceSize.width) / 2) * 2

  // Poster: the first frame, at the same size as the video.
  let generator = AVAssetImageGenerator(asset: asset)
  generator.appliesPreferredTrackTransform = true
  generator.maximumSize = CGSize(width: width, height: height)
  generator.requestedTimeToleranceBefore = .zero
  generator.requestedTimeToleranceAfter = .zero
  let (cgImage, _) = try await generator.image(at: .zero)
  let bitmap = NSBitmapImageRep(cgImage: cgImage)
  guard let jpeg = bitmap.representation(using: .jpeg, properties: [.compressionFactor: 0.82])
  else { throw NSError(domain: "airmic", code: 2) }
  try jpeg.write(to: posterURL)

  // Video: decode, scale, re-encode at a fixed bitrate, drop audio (the page plays muted).
  try? FileManager.default.removeItem(at: videoURL)
  let reader = try AVAssetReader(asset: asset)
  let composition = try await AVMutableVideoComposition.videoComposition(withPropertiesOf: asset)
  let output = AVAssetReaderVideoCompositionOutput(
    videoTracks: [track],
    videoSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
  output.videoComposition = composition
  reader.add(output)

  let writer = try AVAssetWriter(outputURL: videoURL, fileType: .mp4)
  writer.shouldOptimizeForNetworkUse = true
  let input = AVAssetWriterInput(
    mediaType: .video,
    outputSettings: [
      AVVideoCodecKey: AVVideoCodecType.h264,
      AVVideoWidthKey: width,
      AVVideoHeightKey: height,
      AVVideoScalingModeKey: AVVideoScalingModeResizeAspectFill,
      AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: bitrate,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
        AVVideoMaxKeyFrameIntervalKey: Int(frameRate.rounded()) * 2,
      ],
    ])
  input.expectsMediaDataInRealTime = false
  writer.add(input)

  reader.startReading()
  writer.startWriting()
  writer.startSession(atSourceTime: .zero)
  while reader.status == .reading {
    if input.isReadyForMoreMediaData {
      if let sample = output.copyNextSampleBuffer() {
        input.append(sample)
      } else {
        break
      }
    } else {
      try await Task.sleep(nanoseconds: 2_000_000)
    }
  }
  input.markAsFinished()
  await writer.finishWriting()
  if let error = writer.error ?? reader.error { throw error }

  let bytes = try FileManager.default.attributesOfItem(atPath: videoURL.path)[.size] as! Int
  print("video  \(videoURL.path)  \(width)x\(height)  \(bytes / 1024) KB")
  print("poster \(posterURL.path)  \(jpeg.count / 1024) KB")
}

let done = DispatchSemaphore(value: 0)
Task {
  do { try await run() } catch {
    print("error: \(error)")
    exit(1)
  }
  done.signal()
}
done.wait()
