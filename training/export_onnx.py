import argparse
from pathlib import Path

def export_model(weights_path: str, output_path: str = None, imgsz: int = 640):
    try:
        from ultralytics import YOLO
    except ImportError:
        print("Ultralytics not installed. Install via: pip install ultralytics")
        return

    weights = Path(weights_path)
    if not weights.exists():
        print(f"Weights file not found: {weights}")
        return

    print(f"Loading model from {weights}...")
    model = YOLO(str(weights))

    print(f"Exporting to ONNX (imgsz={imgsz}, dynamic=False, opset=17)...")
    success = model.export(format="onnx", imgsz=imgsz, dynamic=False, opset=17)
    print(f"Export completed: {success}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Export trained YOLO model to ONNX for HybridFlow Core")
    parser.add_argument("--weights", type=str, default="runs/train/best.pt", help="Path to best.pt checkpoint")
    parser.add_argument("--imgsz", type=int, default=640, help="Inference image size")
    args = parser.parse_args()

    export_model(args.weights, imgsz=args.imgsz)
