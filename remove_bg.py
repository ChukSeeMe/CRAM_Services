from PIL import Image
import os

def remove_white_bg(input_path, output_path):
    print(f"Opening {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    # We want to remove white and light gray (like checkerboard)
    for item in datas:
        r, g, b, a = item
        # If it's very light (close to white or light gray from a checkerboard)
        if r > 200 and g > 200 and b > 200 and abs(r-g) < 15 and abs(g-b) < 15:
            newData.append((255, 255, 255, 0)) # Transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

input_img = "public/cram_logo_cs.png"
if os.path.exists(input_img):
    remove_white_bg(input_img, input_img)
else:
    print(f"File not found: {input_img}")
