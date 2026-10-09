import os
from pathlib import Path

def inspect_dataset(base_path: str):
    root = Path(base_path).resolve()
    train_imgs = list((root / "train" / "images").glob("*.*"))
    train_lbls = list((root / "train" / "labels").glob("*.txt"))
    val_imgs = list((root / "valid" / "images").glob("*.*"))
    val_lbls = list((root / "valid" / "labels").glob("*.txt"))

    print(f"Dataset Inspection at: {root}")
    print(f"Train set: {len(train_imgs)} images, {len(train_lbls)} label files")
    print(f"Val set:   {len(val_imgs)} images, {len(val_lbls)} label files")

    class_names = ["car", "threewheel", "bus", "truck", "motorbike", "van"]
    class_counts = {i: 0 for i in range(len(class_names))}

    for lbl in train_lbls:
        with open(lbl, "r", encoding="utf-8") as f:
            for line in f:
                parts = line.strip().split()
                if parts:
                    cls_id = int(parts[0])
                    if cls_id in class_counts:
                        class_counts[cls_id] += 1

    print("\nTraining Class Distribution:")
    for idx, name in enumerate(class_names):
        print(f"  [{idx}] {name:<12}: {class_counts[idx]} instances")

if __name__ == "__main__":
    script_dir = Path(__file__).resolve().parent
    default_dir = script_dir.parent / "data" / "vehicle_dataset"
    dataset_dir = os.environ.get("DATASET_DIR", str(default_dir))
    if os.path.exists(dataset_dir):
        inspect_dataset(dataset_dir)
    else:
        print(f"Path not found: {dataset_dir}")
