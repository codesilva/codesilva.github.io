comfy ui path

https://docs.comfy.org/tutorials/flux/flux-2-dev

/Users/edy/Library/Application Support/ComfyUI

Actually, models are at

│                                                                                                                                      │
│ /Users/edy/Documents/ComfyUI/models/text_encoders/qwen_2.5_vl_7b_fp8_scaled.safetensors                                              │
│ /Users/edy/Documents/ComfyUI/models/loras/Qwen-Image-Lightning-8steps-V1.0.safetensors                                               │
│ /Users/edy/Documents/ComfyUI/models/diffusion_models/qwen_image_fp8_e4m3fn.safetensors                                               │
│ /Users/edy/Documents/ComfyUI/models/vae/qwen_image_vae.safetensors

looks like flux won't work on mac bacaue it needs cuda.

i was able to run it on Google Colab but now i want to run it on Cloud Run.

I prepared a Dockerfile

[dockerfile]

tried to build but it didn't work. I had to use `buildx` instead of `build` to get multi platform support.

```bash
docker buildx build \
  --platform linux/amd64 \
  -t flux2 \
  .
```

I then created an Artifactory Registry on GCP and pushed the image there.

```bash
docker tag flux2:latest \
  us-west1-docker.pkg.dev/edy-ai-playground/thumbnailer/flux2:latest

docker push \
  us-west1-docker.pkg.dev/edy-ai-playground/thumbnailer/flux2:latest
```
