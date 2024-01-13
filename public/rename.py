import os
import re
import json

def rename_images_in_ascending_order():
    current_directory = os.getcwd()
    files = os.listdir(current_directory)

    # Filter and sort existing .jpg files
    jpg_files = [f for f in files if f.endswith('.jpg')]
    jpg_files.sort(key=lambda f: int(re.search(r'\d+', f).group()) if re.search(r'\d+', f) else 0)

    # Rename existing files starting from 1 and prepare JSON data
    next_image_number = 1
    json_data = []
    for file in jpg_files:
        new_name = f"{next_image_number}.jpg"
        os.rename(os.path.join(current_directory, file), os.path.join(current_directory, new_name))
        json_data.append({"src": f"/{new_name}", "alt": str(next_image_number)})
        next_image_number += 1

    print(f"Existing images renamed. Starting new images from {next_image_number}.jpg")

    # Write JSON data to a file
    with open('imagesList.json', 'w') as json_file:
        json.dump(json_data, json_file, indent=4)

    # Function to rename new images and update JSON data
    def rename_new_images():
        nonlocal next_image_number
        nonlocal json_data
        new_files = os.listdir(current_directory)
        new_jpg_files = [f for f in new_files if f.endswith('.jpg') and f not in jpg_files]

        for file in new_jpg_files:
            new_name = f"{next_image_number}.jpg"
            os.rename(os.path.join(current_directory, file), os.path.join(current_directory, new_name))
            json_data.append({"src": f"/{new_name}", "alt": str(next_image_number)})
            next_image_number += 1
            print(f"Renamed {file} to {new_name}")

        # Update the JSON file
        with open('imagesList.json', 'w') as json_file:
            json.dump(json_data, json_file, indent=4)

    # Return the function to rename new images and update JSON data
    return rename_new_images

# Run the function and get the rename function for new images
rename_new_images = rename_images_in_ascending_order()

# Example usage: When new images are added, call rename_new_images()
# rename_new_images()
