### Environment setting 

- OS: Linux
- GPU: NVIDIA 1xA40 (VRAM 45GB)

```bash
pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 --index-url https://download.pytorch.org/whl/cu121
pip install git+https://github.com/huggingface/diffusers
pip install git+https://github.com/huggingface/transformers
pip install git+https://github.com/huggingface/accelerate
pip install datasets peft 
pip install deep-translator
pip install googletrans==4.0.0-rc1
```

(notice: for textual_inversion.py and train_text_to_image.py should be updated from https://github.com/huggingface/diffusers/tree/main/examples)

```bash
accelerate config
```

configuration
- Which type of machine are you using?: No distributed training
- Do you want to run your training on CPU only (even if a GPU / Apple Silicon / Ascend NPU device is available)? : NO
- Do you wish to optimize your script with torch dynamo? : NO 
- Do you want to use DeepSpeed? : NO
- What GPU(s) (by id) should be used for training on this machine as a comma-separated list? : all
- Would you like to enable numa efficiency? (Currently only supported on NVIDIA hardware) : NO
- Do you wish to use mixed precision? : fp16 

accelerate configuration saved at ./.hf_home/accelerate/default_config.yaml


