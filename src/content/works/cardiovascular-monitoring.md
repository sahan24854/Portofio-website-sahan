---
title: "Multimodal Blood Pressure Estimation"
description: "Final-year research exploring ECG and PPG feature fusion for cuffless blood-pressure estimation, with a PyTorch MuFuBP-Net implementation and LIME-based analysis."
order: 20
bg: "bg-[#111111]"
cover: "/projects/cardiovascular-monitoring.svg"
tags: ["PyTorch", "Multimodal Learning", "ECG & PPG", "BiLSTM", "Probabilistic Encoding", "LIME"]
year: 2026
repo: "https://github.com/sahan24854/FYP-II"
---

## Research context

My final-year project explores how multiple physiological measurements can support non-invasive cardiovascular monitoring. The broader research goal includes cardiovascular disease prediction; the concrete implementation in this repository focuses on **estimating systolic and diastolic blood pressure from ECG and PPG**.

The repository contains a PyTorch implementation based on the MuFuBP-Net architecture, training and data-analysis notebooks, and feature-level explainability experiments. The reference paper is included in the repository; the architecture is treated here as a research implementation rather than a claim of a newly invented model.

## Project work

- Prepared paired physiological inputs and explored clinical waveform datasets through notebook-based workflows.
- Implemented and experimented with the MuFuBP-Net multimodal architecture: residual encoding, cross-modal enhancement, sequence modeling, feature fusion, and probabilistic encoding.
- Worked with training, validation, checkpointing, and blood-pressure regression metrics in PyTorch.
- Explored LIME explanations on learned features to understand how different feature groups influence individual model outputs.

## Input preparation

The MIMIC-III training notebook loads paired ECG and PPG arrays with arterial blood-pressure (ABP) reference waveforms. Input signals are cropped or padded to 1,000 samples and normalized independently using a z-score transformation.

The notebook derives systolic and diastolic targets from the maximum and minimum of filtered ABP values. This target-construction rule, including its fallback values for invalid references, needs review when interpreting results.

An Aurora BP dataset adapter also appears in the training notebook. It resamples recordings from 500 Hz to 125 Hz, center-crops or pads them, and reads reference blood-pressure labels from an index file. These are experimental data workflows, rather than a deployed sensor acquisition system.

## Multimodal architecture

Each modality passes through a residual self-encoding branch, increasing channels from 1 to 32, 64, and 128. The two branches are concatenated and refined by a cascading cross-feature enhancer using channel attention and residual processing.

A two-layer bidirectional LSTM captures sequence context. In parallel, modality-specific convolutional paths extract morphological and temporal representations using average and maximum pooling.

Multi-scale feature fusion combines the 256-dimensional context vector with four 32-dimensional modality feature vectors to produce a **384-dimensional representation**.

## Probabilistic encoding and outputs

A probabilistic feature encoder maps the fused representation to 64-dimensional mean and log-variance vectors, then samples a latent representation using the reparameterization trick. Fully connected layers feed two separate regression heads for systolic and diastolic pressure.

The training notebook combines weighted absolute-error losses with a KL-divergence term. The implemented target is paired systolic/diastolic regression.

## Training and evaluation

The MIMIC-III notebook includes configurable optimizers, learning-rate scheduling, gradient clipping, checkpoint saving, and early stopping. It creates an 80/20 random split and evaluates on the validation subset used during training. Its reported quantities therefore do not establish independent held-out generalization.

The explainability notebook also contains subject-isolated split preparation, alongside other sample-level evaluation code. These separate experimental paths need to be reconciled into one reproducible, subject-disjoint evaluation protocol before making a final performance claim.

Evaluation code calculates MAE, RMSE, signed error, and error spread, with regression and Bland–Altman plots in the explainability notebook. Numerical threshold checks in a notebook are not evidence of clinical certification. No clinical accuracy or deployment claim is made here.

## Understanding learned features with LIME

The explainability workflow extracts the 384-dimensional fused representation and applies LIME regression explanations to the downstream prediction path. It groups learned features into sequence context, ECG morphology, PPG morphology, ECG temporal, and PPG temporal components.

These are learned internal features, rather than named physiological measurements. Their local surrogate weights describe behavior around a particular example; they do not establish medical causality or universal feature importance.

The probabilistic encoder still samples during the prediction wrapper, so assessing explanation stability across repeated runs is a useful next step.

## Current scope and next steps

This is a final-year research prototype supported by source code and experimental notebooks. A reproducible final checkpoint, consistent subject-level test protocol, independently checked results, and sensor-to-model integration would strengthen the next iteration.

The work gave me practical experience in multimodal deep learning, PyTorch model construction, time-series preprocessing, regression evaluation, and explaining model behavior. Those are the engineering skills I aim to develop further in an AI/ML role.

## Explore the implementation

- [Project overview](https://github.com/sahan24854/FYP-II/blob/main/README.md): broader cardiovascular-monitoring research context.
- [MuFuBP-Net implementation](https://github.com/sahan24854/FYP-II/blob/main/MuFuBP-Net.py): residual branches, cross-feature enhancement, BiLSTM, fusion, and probabilistic regression heads.
- [Training notebook](https://github.com/sahan24854/FYP-II/blob/main/model-training-mimic3-abp.ipynb): preprocessing, training configuration, losses, and evaluation code.
- [LIME analysis notebook](https://github.com/sahan24854/FYP-II/blob/main/explainability%20_LIME%20Analysis.ipynb): learned-feature explanations and evaluation experiments.
