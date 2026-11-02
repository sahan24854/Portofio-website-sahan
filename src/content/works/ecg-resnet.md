---
title: "ECG Classification with Attention ResNet"
description: "Exploring how 1D residual networks learn ECG waveform features for cardiovascular classification, using TensorFlow/Keras, PTB-XL, and attention-based architectures."
order: 60
bg: "bg-[#111111]"
cover: "/projects/ecg-resnet.svg"
tags: ["TensorFlow / Keras", "1D ResNet", "CBAM", "PTB-XL", "WFDB", "Evaluation"]
year: 2025
repo: "https://github.com/sahan24854/Multiclass-CVD-detection-using-ResNet-model"
---

## Project aim

This project explores residual convolutional networks for classifying patterns in twelve-lead ECG recordings. Using PTB-XL, it compares model architectures, attention mechanisms, and the effect of capacity on classification performance.

The repository contains binary and five-class experiments. The reviewed Model 3 and Model 4 notebooks implement **single-label, five-class classification**. Although the README also discusses multilabel prediction, the results below belong to their softmax heads and sparse categorical loss.

## Inputs and labels

The notebooks load the dataset’s low-rate WFDB recordings into 1,000 × 12 tensors: ten seconds sampled at 100 Hz across twelve leads.

The reviewed label preparation maps selected SCP codes into five classes: conduction disturbance (CD), hypertrophy (HYP), myocardial infarction (MI), normal (NORM), and ST/T changes (STTC). It sums annotation weights within these mapped groups, chooses one winning class per record, and drops records without a mapped class.

This target construction differs from retaining all co-occurring diagnoses as multi-hot labels. The resulting class distribution matters when interpreting accuracy and comparing these runs with other PTB-XL benchmarks.

## Fold-based evaluation

The supplied stratification folds are used for training (1–8), validation (9), and testing (10). The reviewed notebooks retain 14,936 training, 1,853 validation, and 1,870 test records after label preparation.

Validation supports model selection and training decisions; the recorded test reports below use fold 10. These are repository notebook outputs, rather than a new retraining or independent clinical evaluation.

## Residual attention models

Model 3 combines 1D residual blocks, squeeze-and-excitation channel attention, a bidirectional LSTM, and temporal attention pooling before a five-output softmax head.

Model 4 uses a wider residual convolutional network with CBAM. Its channel attention weights learned feature channels, followed by a temporal attention operation over the sequence. After convolutional encoding, these channels should not be interpreted as a direct one-to-one weighting of the original ECG leads.

The reviewed Model 4 has stages with 64, 128, 256, and 512 filters, global average pooling, and a dense classification head with dropout. Its compiled objective is sparse categorical cross-entropy with Adam at a learning rate of 0.0003.

## Recorded model comparison

| Saved notebook | Fold-10 accuracy | Top-2 accuracy | Macro F1 |
| --- | --- | --- | --- |
| Model 3: Res-SE + sequence attention | 73.85% | 92.19% | 0.6041 |
| Model 4: wider Res-CBAM | 76.26% | 93.05% | 0.6212 |

The Model 4 run improves aggregate accuracy in the saved comparison, but its class-level results are uneven. This is not an isolated causal test of CBAM, since architecture capacity and other design choices also differ.

## Class-level results

Model 4’s saved classification report shows the following fold-10 F1 scores and support counts.

| Class | F1 score | Records |
| --- | --- | --- |
| CD | 0.6726 | 362 |
| HYP | 0.4083 | 158 |
| MI | 0.7012 | 399 |
| NORM | 0.8722 | 930 |
| STTC | 0.4516 | 21 |

NORM dominates the evaluated subset. The small STTC support and lower minority-class scores make accuracy alone an incomplete summary. Model 4’s HYP F1 is lower than Model 3’s 0.4377, despite the higher overall accuracy.

## Scope and lessons

The work developed my skills in waveform data loading, Keras model construction, residual and attention modules, fold-based experiments, and class-level error analysis.

These are research classification experiments, not a clinical diagnostic product. Further work would align the label mapping with a declared benchmarking protocol, compare architectures under matched conditions, and report per-class uncertainty and additional metrics. The original notebooks remain the source for the recorded results.

## Explore the implementation

- [Repository overview](https://github.com/sahan24854/Multiclass-CVD-detection-using-ResNet-model/blob/main/README.md).
- [Model 3 notebook](https://github.com/sahan24854/Multiclass-CVD-detection-using-ResNet-model/blob/main/ECG_Model3.ipynb): Res-SE, sequence attention, and saved evaluation.
- [Model 4 notebook](https://github.com/sahan24854/Multiclass-CVD-detection-using-ResNet-model/blob/main/ECG_Model4.ipynb): CBAM residual network, labels, folds, and class-level report.
