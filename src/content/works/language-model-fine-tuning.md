---
title: "Fine-Tuning a Small Language Model for Maths"
description: "Fine-tuning SmolLM2-360M with LoRA for arithmetic word problems, with a reproducible Kaggle workflow covering data preparation, training, and before-and-after evaluation."
order: 40
bg: "bg-[#111111]"
cover: "/projects/language-model-fine-tuning.svg"
tags: ["PyTorch", "Transformers", "PEFT / LoRA", "Evaluation", "Kaggle"]
year: 2026
repo: "https://github.com/sahan24854/Fine-Tuning-LLM-for-math"
---

## Project overview

I explored parameter-efficient fine-tuning for arithmetic word problems. The project measures HuggingFaceTB/SmolLM2-360M before and after response-only LoRA training, while separating correct reasoning from easier-to-parse output.

The repository’s current experiment uses SmolLM2-360M; older Qwen/1.5B notebooks remain as historical work. The current model and results below belong to the SmolLM2 protocol.

## Reproducible experiment design

The workflow prepares checksum-verified data, audits tokens and exact question overlap, freezes demonstrations and the model revision, and saves an immutable data bundle. Baseline and adapted evaluations reuse that bundle and the same evaluator.

GSM8K supplies training and validation data. SVAMP and generated arithmetic probes provide additional evaluation views. Exact normalized question-overlap checks do not establish semantic decontamination or absence from model pretraining.

## Response-only LoRA training

The first adapter uses rank 16, alpha 32, dropout 0.05, and attention projection targets `q_proj`, `k_proj`, `v_proj`, and `o_proj`. Training masks prompt and padding tokens, includes EOS, and optimizes completion tokens.

The declared run uses three epochs, a learning rate of 0.0002, micro-batches of four, and eight gradient-accumulation steps. The reviewed run completed 633 updates. Checkpoint selection follows the lowest validation response-token negative log-likelihood, separately from the inspected comparison questions.

Validation loss decreased from approximately 1.040 to 0.708. That teacher-forced loss improvement is useful training evidence, but does not by itself establish more accurate generated solutions.

## Paired comparison results

The completed development comparison evaluated 100 questions from each dataset, using the same questions for the original model and first adapter. Official scoring treats unparseable answers as incorrect.

| Dataset | Original correct | First adapter correct | Change |
| --- | --- | --- | --- |
| GSM8K | 5 / 100 | 8 / 100 | +3 percentage points |
| SVAMP | 20 / 100 | 12 / 100 | −8 percentage points |
| Arithmetic | 4 / 100 | 54 / 100 | +50 percentage points |

The word-problem results are mixed: GSM8K’s small increase has a paired-bootstrap interval that includes zero, while SVAMP declines. These already-inspected development sets are not an untouched final holdout.

## Formatting versus mathematical ability

The arithmetic score needs context. An exploratory answer-evidence audit also recognized correct unlabelled equations from the original model, changing that diagnostic comparison to **51 / 100 versus 54 / 100**. This post-inspection audit is separate from the frozen official score.

Parseable arithmetic answers increased from 23 to 97 out of 100. Across all three datasets, cap-limited outputs fell from 33 to 8. The adapter clearly improved formatting and termination, while a broad mathematical reasoning improvement was not established.

## Validation analysis and follow-up

Subsequent validation work inspects setup, calculation, parsing, and stopping errors. A lower-learning-rate trial completed another 633 updates but scored 3 / 50 on the reviewed validation diagnostic, compared with 6 / 50 for the first adapter. Both adapters were retained.

The next documented stage checks inference paths and prepares a balanced-data variant. That proposed data intervention is a hypothesis, not a completed improvement or a replacement for the earlier scores.

## Engineering skills developed

The project combines parameter-efficient fine-tuning, completion-only objectives, deterministic data preparation, artifact verification, paired evaluation, bootstrap uncertainty, and manual error analysis. Its main lesson is to measure the behavior of generated answers rather than interpreting training loss or formatting gains as a complete capability result.

## Explore the implementation

- [Project overview and current status](https://github.com/sahan24854/Fine-Tuning-LLM-for-math/blob/main/README.md).
- [LoRA configuration](https://github.com/sahan24854/Fine-Tuning-LLM-for-math/blob/main/configs/lora_training.json).
- [Reviewed paired comparison](https://github.com/sahan24854/Fine-Tuning-LLM-for-math/blob/main/docs/comparison-review-2026-10-21.md).
- [Lower-learning-rate review](https://github.com/sahan24854/Fine-Tuning-LLM-for-math/blob/main/docs/lower-lr-review-2026-10-22.md).
