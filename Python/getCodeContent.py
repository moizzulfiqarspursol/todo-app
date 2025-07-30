import os

def write_all_contents_to_txt(folder_path, output_file='output.txt'):
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for root, _, files in os.walk(folder_path):
            for file in files:
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    relative_path = os.path.relpath(file_path, start=folder_path)
                    outfile.write(f"{os.path.join(folder_path, relative_path)}: [\n{content}\n]\n\n")
                except Exception as e:
                    print(f"Could not read {file_path}: {e}")

# Example usage:
write_all_contents_to_txt(r"C:\Users\moiz.zulfiqar\Documents\Learning\Angular\learning-with-ammar\todo-app\src\app\core\state\todos", 'output1.txt')
# write_all_contents_to_txt(r"C:\Users\moiz.zulfiqar\Documents\Assessments\Angular\Stepper\src\styles")
