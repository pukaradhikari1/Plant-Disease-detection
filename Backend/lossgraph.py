import matplotlib.pyplot as plt

# Data extracted from logs
phase1_loss = [
1.5556,
0.8338,
0.6393,
0.5364,
0.4633,
0.4184,
0.3812,
0.3553,
0.3305,
0.3166,
0.2933,
0.2844,
0.2668,
0.2559,
0.2479]

phase2_loss = [
0.8070,
0.4198,
0.3027,
0.2441,
0.1938]

# Combine losses and create epoch labels (1 to 20)
total_loss = phase1_loss + phase2_loss
epochs = list(range(1, len(total_loss) + 1))

# Create the plot
plt.figure(figsize=(10, 6))
plt.plot(epochs, total_loss, marker='o', linestyle='-', color='b', label='Training Loss')

# Mark the transition between Phase 1 and Phase 2
plt.axvline(x=15.5, color='r', linestyle='--', label='Phase Transition (Fine-tuning)')
plt.text(3, max(total_loss)*0.95, 'Phase 1: Classifier', color='red', fontweight='bold')
plt.text(12, max(total_loss)*0.95, 'Phase 2: Fine-tuning', color='red', fontweight='bold')

# Add labels, title, and grid
plt.title('Efficientnet\nTraining Loss vs. Epoch')
plt.xlabel('Epoch')
plt.ylabel('Loss Value')
plt.xticks(range(1, 21))
plt.grid(True, linestyle=':', alpha=0.6)
plt.legend()

# Display or save the plot
plt.savefig('Efficientnet_lossgraph.png')
plt.show()