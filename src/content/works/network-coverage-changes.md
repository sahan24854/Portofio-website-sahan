---
title: "Cellular Network Coverage Change Detection"
description: "An internship project connecting AI/ML and telecommunications: classify 14-day coverage patterns with ConvLSTM, then turn changed cells into spatial zones for engineering review."
order: 10
bg: "bg-[#111111]"
cover: "/projects/network-coverage-changes.svg"
tags: ["PyTorch", "Telecommunications", "Azure ML", "PySpark", "Microsoft Fabric", "PostGIS", "QGIS"]
year: 2026
repo: "https://github.com/sahan24854/Network-coverage-changes-detection"
---

## The engineering problem

Cellular coverage observations vary across both location and time. Engineers need a way to distinguish persistent patterns from coverage reduction or expansion, then locate groups of affected cells for review.

Developed during my Network Analytics and Automation internship at Dialog Axiata, this project brings together telecommunications analytics, data engineering, and spatial-temporal machine learning. I worked in collaboration with the Radio Network Planning unit.

## My contribution

- Built spatial data-cleaning and preparation workflows for MR/MDT telemetry in Microsoft Fabric, including neighbourhood-based denoising of 20 m grids.
- Developed time-weighted labels to describe coverage changes across a 14-day observation window.
- Developed and trained a PyTorch ConvLSTM classifier, with model registration and batch inference in Azure ML.
- Prepared polygon and clustered-zone outputs, plus transactional PostgreSQL/PostGIS publication code for QGIS review.

## Data and labeling

The workflow begins with cleaned national MR/MDT observations. PySpark export code filters the required dates, deduplicates grid/date records, and writes date-partitioned Parquet with an immutable manifest. Tiled preparation and sparse presence staging avoid building one dense national raster.

Each cell has a 14-day binary presence history. The current version compares independently normalized, exponentially weighted means from the older and newer seven-day periods. The decay rate is 0.15; a difference of at least ±0.15 produces a reduction or expansion label.

Otherwise, full-window weighted presence of at least 0.80 produces **stable covered**, and at most 0.20 produces **stable hole**. Intermediate cells are masked, and change labels take precedence. These are mathematical labels derived from telemetry; missing observations alone do not establish a physical coverage failure.

## Model and training

The PyTorch model takes 14 frames of 128 × 128 cells through two ConvLSTM layers with 32 and 16 hidden channels, followed by a convolutional classification head producing four per-cell logits.

Training combines class-weighted focal loss and Dice loss. Change-containing patches are sampled more often, while AdamW, cosine learning-rate scheduling, gradient clipping, and early stopping support optimization. The selected checkpoint has the lowest validation loss.

Training and validation use separate geographic patch footprints with a buffer. The documented training window is 4–17 September 2026, capped at 2,000 training and 500 validation patches. These caps apply to training preparation, not the extent of national inference.

## Batch inference and spatial zones

A separate Azure ML pipeline reuses the registered model and runs three dependent stages: **prepare → infer → build layers**. It classifies the selected observation window rather than forecasting an unseen next day.

Inference covers observed cells and their eight immediate neighbours, clipped to the observed extent. It does not imply predictions for every land cell in Sri Lanka.

Reduction and expansion cells are clustered separately with DBSCAN semantics in a metric coordinate system, including cross-tile stitching. The current initial settings are a 55.5 m radius and a minimum of 10 points. Each zone is the union of its member 20 m cells. These parameters and size-based severity bands require operational assessment.

## Outputs and delivery status

The repository handover records a completed historical Azure ML scoring test, generated prediction polygons and change zones, and a successful return copy to Fabric. The national version 3 model is documented as trained and registered.

The new PostgreSQL publisher stages predictions and zones, validates them, and publishes both atomically. Its code includes retry safety, date-partitioned outputs, and five-calendar-day retention.

**Live activation of this new publication path and its QGIS layers remains pending.** Full unattended daily orchestration is partially prepared and still requires identity configuration, pipeline wiring, and end-to-end acceptance testing. The completed batch test should not be confused with a fully activated daily service.

## Evaluation and limitations

Evaluation scripts produce unique-cell and geographic-holdout reports. Their metrics measure agreement with the deterministic labeling rules, rather than independently verified physical radio coverage. Later windows can overlap training observation dates, which must be disclosed when interpreting results.

The repository does not establish a verified operational accuracy figure for version 3, so none is claimed here. Independent network-quality validation and full daily-operation acceptance remain next steps.

## What I learned

This project strengthened my experience in spatial-temporal modeling, geographic validation, cloud batch workflows, and reliable data publication. It also showed me why model outputs need clear operational meaning: a successful scoring run, agreement with generated labels, and a verified network improvement are different kinds of evidence.

## Explore the implementation

- [Project README](https://github.com/sahan24854/Network-coverage-changes-detection/blob/main/README.md): system overview and current model semantics.
- [Model architecture](https://github.com/sahan24854/Network-coverage-changes-detection/blob/main/scripts/model_architecture.py): ConvLSTM encoder, classification head, and losses.
- [Azure ML scoring pipeline](https://github.com/sahan24854/Network-coverage-changes-detection/blob/main/scripts/scoring_pipeline.py): dependent preparation, inference, and layer-generation stages.
- [Project handover](https://github.com/sahan24854/Network-coverage-changes-detection/blob/main/docs/PROJECT_HANDOVER.md): documented execution evidence, current status, and remaining activation work.
