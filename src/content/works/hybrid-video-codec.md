---
title: "Hybrid Video Codec Design"
description: "An EE596 course project combining DCT-based image coding, adaptive quantization, and documented INTRA/INTER motion prediction to explore compression under a constrained bit budget."
order: 30
bg: "bg-[#111111]"
cover: "/projects/hybrid-video-codec.svg"
tags: ["Python", "OpenCV", "NumPy", "SciPy", "DCT", "Motion Estimation", "Rate Control"]
year: 2026
repo: "https://github.com/sahan24854/EE596-Project"
---

## Project context

Built for EE596 — Video and Image Coding at the University of Peradeniya, this mini-project explores the engineering trade-off between compressed size and reconstructed visual quality.

The repository brings together a working image encoder/decoder notebook, a progress report, a description of video block prediction, and an original prediction/residual output figure. The image-compression stage provides the spatial coding foundation for the hybrid video design.

## Implementation work

- Built a modular color-image coding path using OpenCV, NumPy, SciPy’s DCT/IDCT, and zlib.
- Implemented separate luminance and chrominance quantization, with reconstruction through the decoder.
- Developed a binary-search controller to adjust quantization scale toward a target encoded size.
- Explored temporal prediction through block matching and per-macroblock INTRA/INTER decisions, documented in the README and video output figure.

## Image coding pipeline

The notebook converts RGB input into OpenCV’s YCrCb representation and splits the luminance and two chrominance channels. Each channel is edge-padded to dimensions divisible by eight, then divided into **8 × 8 blocks**.

The forward transform subtracts 128 from each block and applies an orthonormal 2D discrete cosine transform. Quantization divides the coefficients by a scaled matrix and rounds them; this is the lossy stage. Separate luminance and chrominance matrices retain different levels of detail.

Quantized coefficients are stored as signed 16-bit arrays and losslessly compressed with zlib. The decoder decompresses the arrays, multiplies by the quantization matrices, applies inverse DCT, restores the offset, and reconstructs the color image.

## Adaptive quantization

The rate controller searches quantization scales between 1 and 500. At each iteration, it encodes and reconstructs the image, measures the compressed bit count, and updates its search bounds. A size above the target increases compression; a size below the target permits less compression.

The controller stops within a **2% relative size tolerance**, or after 20 iterations, and retains the tested candidate closest to the budget. PSNR is calculated for the reconstructed image. This is an approximate bit-budget search rather than an exhaustive proof of the globally optimal rate-distortion point.

## Recorded notebook results

The saved experiment uses one image resized to **720 × 480 pixels**. The following values come from the notebook’s output logs and original figures.

| Target budget | Encoded size | Q-scale | PSNR |
| --- | --- | --- | --- |
| 150,000 bits | 152,056 bits | 16.59 | 19.42 dB |
| 300,000 bits | 299,680 bits | 7.33 | 22.23 dB |
| 382,000 bits | 379,240 bits | 5.39 | 23.13 dB |
| 600,000 bits | 599,792 bits | 2.83 | 24.83 dB |

The 382,000-bit target converged in 10 iterations, finishing approximately 0.72% below the target. Under the report’s assumption of **one image transmitted per second**, that budget corresponds to 382 kbit/s. The notebook itself measures encoded bits per image, not a measured streaming-video bitrate.

![Original notebook comparison of 150,000, 300,000, and 600,000-bit budgets, showing reconstruction quality at each setting](/projects/codec/budget-comparison.png)

## Quality and compression

A separate experiment compares fixed quantization scales of 0.5, 1.0, and 4.0. For this source image, the saved figures report 30.04, 27.68, and 23.92 dB PSNR respectively. Higher quantization scales reduce the encoded size while introducing more visible detail loss.

![Original high-, medium-, and low-quality notebook reconstructions at quantization scales 0.5, 1.0, and 4.0](/projects/codec/quality-levels.png)

## Video prediction design

The README describes a **16 × 16 macroblock** prediction stage. Edge padding supports dimensions that are not exact block multiples. For each block, a DC-style INTRA predictor provides a spatial fallback, while an INTER block matcher searches the reference frame using sum of absolute differences (SAD).

The documented search uses a default radius of eight pixels and a two-pixel search step to reduce computation. The decision block compares INTRA and INTER SAD values and selects the lower-error prediction. The frame-extraction helper uses a five-frame gap to make motion more noticeable during testing.

The supplied output figure shows reference and current frames, the combined prediction, and the residual. The downloadable notebook contains the image-compression stage; the temporal stage is described and illustrated separately. A reproducible full-sequence video encoder/decoder and its benchmarks are not established by those artifacts alone.

## Scope and next steps

This is an educational hybrid-coding design, rather than an H.264-compatible bitstream implementation. The current image stage uses zlib on quantized arrays; measured sizes do not establish a complete video transport or container overhead budget.

Useful next steps include publishing the temporal-stage implementation alongside the image notebook, testing multiple sequences and resolutions, and evaluating full reconstructed sequences, motion-vector overhead, and encoding runtime.

The project strengthened my experience in numerical computing, image reconstruction, optimization loops, and the relationship between compression and communication bandwidth.

## Explore the implementation

- [Project README](https://github.com/sahan24854/EE596-Project/blob/main/README.md): documented block matching, prediction, and mode decisions.
- [Implementation notebook](https://github.com/sahan24854/EE596-Project/blob/main/EE596_mini_project.ipynb): image encoder, decoder, adaptive quantization, and saved experiments.
- [Progress report](https://github.com/sahan24854/EE596-Project/blob/main/12th%20week%20progress.pdf): design explanation and one-image-per-second assumption.
- [Video output figure](https://github.com/sahan24854/EE596-Project/blob/main/Video%20compression%20system%20outputs.png): prediction and residual comparison.
