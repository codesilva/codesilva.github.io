# Fine-tuning LLMs for Hotwire Turbo - Practical Guide

## Step 1: Setup Your Environment

### Install Ollama and Required Tools
```bash
# Install Ollama (macOS/Linux)
curl -fsSL https://ollama.com/install.sh | sh

# Pull base models for experimentation
ollama pull llama3.2:3b      # Smaller, faster for testing
ollama pull mistral:7b       # Better for complex patterns
ollama pull codellama:7b     # Code-specific model
```

### Python Environment Setup
```bash
# Create virtual environment
python -m venv hotwire-llm
source hotwire-llm/bin/activate

# Install required packages
pip install transformers datasets torch peft bitsandbytes
pip install llm weave       # For evaluation
```

## Step 2: Create Your Hotwire Dataset

### Quick Dataset Generator
Save this as `create_dataset.py`:

```python
import json
import yaml
from datasets import Dataset

def create_hotwire_training_data():
    """Create practical Hotwire examples for fine-tuning"""
    
    training_pairs = [
        {
            "instruction": "Generate a Turbo Frame for editing a user profile inline",
            "input": "Create an inline editing system for user profiles",
            "output": """<%= turbo_frame_tag "user_profile_#{@user.id}" do %>
  <%= form_with model: @user, url: user_path(@user), method: :patch do |f| %>
    <div class="form-group">
      <%= f.label :name, "Name" %>
      <%= f.text_field :name, class: "form-control" %>
    </div>
    <div class="form-group">
      <%= f.label :email, "Email" %>  
      <%= f.email_field :email, class: "form-control" %>
    </div>
    <%= f.submit "Save Changes", class: "btn btn-primary" %>
    <%= link_to "Cancel", user_path(@user), class: "btn btn-secondary", 
                data: { turbo_frame: "user_profile_#{@user.id}" } %>
  <% end %>
<% end %>"""
        },
        {
            "instruction": "Generate a Turbo Stream response for creating todos",
            "input": "When a todo is created, append it to the list and clear the form",
            "output": """<%= turbo_stream.append "todos" do %>
  <%= render "todo_item", todo: @todo %>
<% end %>

<%= turbo_stream.replace "new_todo_form" do %>
  <%= render "todos/form", todo: Todo.new %>
<% end %>

<%= turbo_stream.prepend "flash" do %>
  <div class="alert alert-success">
    Todo created successfully!
  </div>
<% end %>"""
        },
        {
            "instruction": "Generate a Stimulus controller for handling dynamic selects",
            "input": "Create a Stimulus controller that updates a dropdown based on another selection",
            "output": """import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["source", "destination", "loading"]
  static values = { url: String }

  connect() {
    this.updateDestination()
  }

  sourceChanged() {
    this.updateDestination()
  }

  async updateDestination() {
    const sourceId = this.sourceTarget.value
    const destinationSelect = this.destinationTarget
    
    if (!sourceId) {
      this.clearDestination()
      return
    }

    this.showLoading()
    
    try {
      const response = await fetch(`${this.urlValue}?source_id=${sourceId}`)
      const data = await response.json()
      
      this.populateDestination(data.options)
    } catch (error) {
      console.error("Failed to load options:", error)
      this.showError()
    } finally {
      this.hideLoading()
    }
  }

  populateDestination(options) {
    this.destinationTarget.innerHTML = ""
    
    options.forEach(option => {
      const optionElement = document.createElement("option")
      optionElement.value = option.id
      optionElement.textContent = option.name
      this.destinationTarget.appendChild(optionElement)
    })
  }

  clearDestination() {
    this.destinationTarget.innerHTML = '<option value="">Select an option</option>'
  }

  showLoading() {
    if (this.hasLoadingTarget) {
      this.loadingTarget.classList.remove("d-none")
    }
    this.destinationTarget.disabled = true
  }

  hideLoading() {
    if (this.hasLoadingTarget) {
      this.loadingTarget.classList.add("d-none")
    }
    this.destinationTarget.disabled = false
  }

  showError() {
    // Handle error state
    this.destinationTarget.innerHTML = '<option value="">Error loading options</option>'
  }
}"""
        },
        # Add 10-15 more examples covering common patterns
    ]
    
    return Dataset.from_list(training_pairs)

def save_dataset(dataset, path="hotwire_dataset.jsonl"):
    with open(path, "w") as f:
        for item in dataset:
            f.write(json.dumps(item) + "\n")
    print(f"Saved {len(dataset)} training examples to {path}")

if __name__ == "__main__":
    dataset = create_hotwire_training_data()
    save_dataset(dataset)
```

## Step 3: Quick Fine-tuning with LoRA

### Create `train_lora.py`:
```python
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from datasets import load_dataset
import torch
from transformers import Trainer, TrainingArguments

def train_hotwire_model():
    # Load smaller model for faster training
    model_name = "codellama/CodeLlama-7b-Python-hf"
    
    print("Loading model and tokenizer...")
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        load_in_4bit=True,
        torch_dtype=torch.float16,
        device_map="auto"
    )
    
    # Prepare for LoRA training
    model = prepare_model_for_kbit_training(model)
    
    # Configure LoRA
    lora_config = LoraConfig(
        r=16,  # Rank
        lora_alpha=32,  # LoRA scaling parameter
        target_modules=["q_proj", "v_proj"],  # Target attention layers
        lora_dropout=0.1,
        bias="none",
        task_type="CAUSAL_LM"
    )
    
    model = get_peft_model(model, lora_config)
    
    # Load your dataset
    dataset = load_dataset("json", data_files="hotwire_dataset.jsonl", split="train")
    
    # Format dataset for training
    def format_instruction(example):
        return {
            "text": f"### Instruction:\n{example['instruction']}\n\n### Input:\n{example.get('input', '')}\n\n### Response:\n{example['output']}\n"
        }
    
    formatted_dataset = dataset.map(format_instruction)
    
    # Tokenize
    def tokenize_function(examples):
        return tokenizer(
            examples["text"],
            truncation=True,
            padding="max_length",
            max_length=1024
        )
    
    tokenized_dataset = formatted_dataset.map(tokenize_function, batched=True)
    
    # Training arguments
    training_args = TrainingArguments(
        output_dir="./hotwire-lora-model",
        num_train_epochs=3,
        per_device_train_batch_size=2,
        gradient_accumulation_steps=4,
        learning_rate=2e-4,
        fp16=True,
        logging_steps=10,
        save_strategy="epoch",
        evaluation_strategy="no"  # Skip eval for now
    )
    
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_dataset,
        tokenizer=tokenizer
    )
    
    print("Starting training...")
    trainer.train()
    
    print("Saving model...")
    model.save_pretrained("hotwire-lora-model")
    tokenizer.save_pretrained("hotwire-lora-model")

if __name__ == "__main__":
    train_hotwire_model()
```

### Run Training
```bash
python train_lora.py
# Takes 30-60 minutes on a decent GPU, several hours on CPU
```

## Step 4: Convert and Test with Ollama

### Create `convert_to_ollama.py`:
```python
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel
import torch

def convert_for_ollama():
    # Load base model and LoRA weights
    base_model = "codellama/CodeLlama-7b-Python-hf"
    lora_model_path = "hotwire-lora-model"
    
    print("Loading models...")
    model = AutoModelForCausalLM.from_pretrained(
        base_model,
        torch_dtype=torch.float16,
        device_map="auto"
    )
    
    model = PeftModel.from_pretrained(model, lora_model_path)
    tokenizer = AutoTokenizer.from_pretrained(lora_model_path)
    
    # Merge LoRA weights with base model
    merged_model = model.merge_and_unload()
    
    # Save merged model
    print("Saving merged model...")
    merged_model.save_pretrained("hotwire-merged")
    tokenizer.save_pretrained("hotwire-merged")
    
    print("Done! Now create a Modelfile and run:")
    print("ollama create hotwire-turbo -f Modelfile")

if __name__ == "__main__":
    convert_for_ollama()
```

### Create `Modelfile`:
```
FROM hotwire-merged

# Hotwire-specific system prompt
SYSTEM """You are a Rails developer specialized in Hotwire Turbo. Always prefer server-side solutions over client-side JavaScript. Generate code that follows Rails conventions and uses Turbo Frames, Turbo Streams, and Stimulus controllers appropriately."""

PARAMETER temperature 0.7
PARAMETER top_p 0.8
PARAMETER top_k 20
```

### Create and test the model:
```bash
# Convert and create Ollama model
python convert_to_ollama.py
ollama create hotwire-turbo -f Modelfile

# Test it
ollama run hotwire-turbo "Create a Turbo Frame for editing a blog post inline"
```

## Step 5: Quick Evaluation

### Create `test_model.py`:
```python
import subprocess
import json
from typing import List, Dict

def test_hotwire_model() -> Dict:
    """Quick test of the fine-tuned model"""
    
    test_cases = [
        {
            "prompt": "Generate a Turbo Stream response for updating a product price",
            "expected_patterns": ["turbo_stream.replace", "product_"]
        },
        {
            "prompt": "Create a Stimulus controller for form validation", 
            "expected_patterns": ["Controller", "connect()", "validate"]
        },
        {
            "prompt": "Generate a Turbo Frame for comments that loads more on scroll",
            "expected_patterns": ["turbo_frame_tag", "lazy"]
        }
    ]
    
    results = {}
    
    for i, test in enumerate(test_cases):
        try:
            # Run ollama command
            result = subprocess.run([
                "ollama", "run", "hotwire-turbo", 
                test["prompt"]
            ], capture_output=True, text=True, timeout=30)
            
            output = result.stdout.strip()
            
            # Check for expected patterns
            pattern_matches = all(p in output for p in test["expected_patterns"])
            
            results[f"test_{i+1}"] = {
                "prompt": test["prompt"],
                "output": output[:200] + "..." if len(output) > 200 else output,
                "pattern_matches": pattern_matches,
                "syntax_valid": "<%=" in output or "import" in output  # Basic validation
            }
            
        except subprocess.TimeoutExpired:
            results[f"test_{i+1}"] = {
                "error": "Timeout",
                "prompt": test["prompt"]
            }
        except Exception as e:
            results[f"test_{i+1}"] = {
                "error": str(e),
                "prompt": test["prompt"]
            }
    
    return results

def compare_with_base() -> Dict:
    """Compare fine-tuned model with base model"""
    
    test_prompt = "Create a Turbo Stream response for updating a shopping cart total"
    
    results = {}
    
    for model in ["hotwire-turbo", "codellama:7b"]:
        try:
            result = subprocess.run([
                "ollama", "run", model, test_prompt
            ], capture_output=True, text=True, timeout=30)
            
            output = result.stdout.strip()
            
            # Score based on Hotwire-specific criteria
            turbo_score = 0
            if "turbo_stream" in output:
                turbo_score += 20
            if "replace" in output or "update" in output:
                turbo_score += 20
            if "cart" in output:
                turbo_score += 10
            if "@" in output:  # Rails instance variable
                turbo_score += 10
            if not "jQuery" in output and not "$.ajax" in output:
                turbo_score += 20  # Prefer server-side over client-side
                
            results[model] = {
                "output": output[:200] + "..." if len(output) > 200 else output,
                "turbo_score": turbo_score,
                "length": len(output)
            }
            
        except Exception as e:
            results[model] = {"error": str(e)}
    
    return results

if __name__ == "__main__":
    print("=== Testing Hotwire-Turbo Model ===")
    results = test_hotwire_model()
    
    for test_name, result in results.items():
        print(f"\n{test_name}:")
        if "error" in result:
            print(f"  ERROR: {result['error']}")
        else:
            print(f"  Prompt: {result['prompt']}")
            print(f"  Pattern Matches: {result['pattern_matches']}")
            print(f"  Syntax Valid: {result['syntax_valid']}")
            print(f"  Output: {result['output']}")
    
    print("\n=== Comparing with Base Model ===")
    comparison = compare_with_base()
    
    for model, result in comparison.items():
        print(f"\n{model}:")
        if "error" in result:
            print(f"  ERROR: {result['error']}")
        else:
            print(f"  Turbo Score: {result['turbo_score']}/70")
            print(f"  Length: {result['length']} chars")
            print(f"  Output: {result['output']}")
```

### Run evaluation:
```bash
python test_model.py
```

## Step 6: Real-world Testing

### Create a test Rails app:
```bash
rails new hotwire_test_app --css=bootstrap
cd hotwire_test_app

# Add Hotwire
bin/bundle add hotwire-rails
bin/rails hotwire:install

# Generate scaffold for testing
bin/rails generate scaffold Post title:string body:text
bin/rails db:migrate
```

### Use your model to generate code:
```bash
# Generate Turbo Frame for inline editing
ollama run hotwire-turbo "Create a Turbo Frame for inline editing of post titles with a form that submits on blur"

# Generate Stimulus for dynamic updates
ollama run hotwire-turbo "Create a Stimulus controller that updates character count for a textarea field"
```

## Step 7: Rapid Iteration

### Quick improvements:
1. **Add more training examples**: Expand dataset with your specific use cases
2. **Adjust LoRA parameters**: Try r=8 for faster training, r=32 for more adaptability
3. **Modify system prompt**: Tune the system message in Modelfile
4. **A/B test prompts**: Compare different ways of asking for the same thing

### Common fixes:
```bash
# Model generating too much JavaScript?
echo 'SYSTEM "You are a Rails developer who prefers server-side solutions. NEVER use jQuery, always use Turbo Streams and Stimulus controllers."' >> Modelfile

# Model forgetting Rails conventions?
echo 'PARAMETER temperature 0.5' >> Modelfile  # Lower = more consistent

# Model too verbose?
echo 'PARAMETER num_predict 500' >> Modelfile  # Limit response length
```

## Quick Reference

### Essential Commands:
```bash
# Training
python create_dataset.py                    # Generate dataset
python train_lora.py                        # Train with LoRA
python convert_to_ollama.py                 # Convert for Ollama
ollama create hotwire-turbo -f Modelfile    # Create model

# Testing
ollama run hotwire-turbo "your prompt"      # Manual testing
python test_model.py                       # Automated evaluation
llm logs -n 10                             # Check recent outputs

# Monitoring progress
tail -f training_log.txt                   # Watch training logs
watch -n 5 'ollama run hotwire-turbo "Create a Turbo Stream"'  # Continuous test
```

### Quick Dataset Templates:
```python
# Turbo Frame patterns
turbo_frame_template = {
    "instruction": f"Create a Turbo Frame for {functionality}",
    "input": f"Need inline editing for {model} attributes",
    "output": f"<%= turbo_frame_tag \"#{model}_#{@user.id}\" do %>...<% end %>"
}

# Turbo Stream patterns  
stream_template = {
    "instruction": f"Generate Turbo Stream for {action}",
    "input": f"When {event}, update the {target}",
    "output": f"<%= turbo_stream.{action} \"{target}\", {content} %>"
}

# Stimulus patterns
stimulus_template = {
    "instruction": f"Create Stimulus controller for {behavior}",
    "input": f"Handle {trigger} events for {purpose}",
    "output": f"export default class extends Controller {{ static targets = []; connect() {{ }} }}"
}
```

This gets you from zero to a working fine-tuned model in a few hours instead of weeks. Start with 20-30 good examples, train for 3 epochs, and iterate based on real results.