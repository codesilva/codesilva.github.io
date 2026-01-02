import torch

# This script assumes 'pipe' and 'device' are already defined in your environment.
# If running as a standalone script, you'll need to initialize your Flux pipeline here.

prompts = [
    "A high-quality, professional photograph of a minimalist white coffee mug sitting on a wooden desk. On the mug, the words 'FLUX IS COFFEE FOR THE EYES' are printed in clean, elegant black serif typography. Soft morning sunlight is hitting the side of the mug, creating a gentle shadow.",
    "A hyper-realistic close-up portrait of an elderly fisherman with a weathered face, deep wrinkles, and a salt-and-pepper beard. He is wearing a yellow raincoat covered in tiny droplets of water. The lighting is moody and overcast.",
    "A majestic lion made entirely of iridescent flowing water, standing in the middle of a dry desert. Sun is setting in the background, casting a golden glow.",
    "A wide-angle cinematic shot of a futuristic Tokyo street at night during a heavy rainstorm. Massive holographic advertisements reflecting in the wet pavement.",
    "Macro photography of a mechanical steampunk butterfly landing on a real flower. Wings made of translucent amber and brass gears."
]

def run_generation(pipe, device):
    for i, prompt in enumerate(prompts):
        print(f"Generating image {i+1}/{len(prompts)}...")
        
        image = pipe(
            prompt=prompt,
            generator=torch.Generator(device=device).manual_seed(42),
            num_inference_steps=50,
            guidance_scale=4,
        ).images[0]

        filename = f"flux_output_{i+1}.png"
        image.save(filename)
        print(f"Saved to {filename}")

if __name__ == "__main__":
    # Example initialization (uncomment and adjust if running standalone):
    # from diffusers import FluxPipeline
    # device = "cuda" if torch.cuda.is_available() else "cpu"
    # pipe = FluxPipeline.from_pretrained("black-forest-labs/FLUX.1-schnell", torch_dtype=torch.bfloat16).to(device)
    # run_generation(pipe, device)
    pass
