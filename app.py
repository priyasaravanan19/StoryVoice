from flask import Flask, render_template, request, jsonify
import pyttsx3
import threading
import os

app = Flask(__name__)

# ---------------------------------------
# Text-to-Speech Engine
# ---------------------------------------

engine = pyttsx3.init()

engine_lock = threading.Lock()

# Default voice settings
engine.setProperty("rate", 160)
engine.setProperty("volume", 1.0)


# ---------------------------------------
# Home Page
# ---------------------------------------

@app.route("/")
def home():
    return render_template("index.html")


# ---------------------------------------
# Speak Story
# ---------------------------------------

@app.route("/speak", methods=["POST"])
def speak():

    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "No data received."
            }), 400

        text = data.get("text", "").strip()

        rate = int(data.get("rate", 160))

        volume = float(data.get("volume", 1.0))

        # Check story
        if not text:
            return jsonify({
                "success": False,
                "message": "Please enter a story first."
            }), 400

        # Keep values safe
        rate = max(80, min(250, rate))

        volume = max(0.0, min(1.0, volume))

        # Speech function
        def speak_text():

            try:

                with engine_lock:

                    engine.setProperty(
                        "rate",
                        rate
                    )

                    engine.setProperty(
                        "volume",
                        volume
                    )

                    engine.say(text)

                    engine.runAndWait()

            except Exception as error:

                print("Speech error:", error)

        # Run speech in background
        speech_thread = threading.Thread(
            target=speak_text,
            daemon=True
        )

        speech_thread.start()

        return jsonify({
            "success": True,
            "message": "Story narration started."
        })

    except Exception as error:

        return jsonify({
            "success": False,
            "message": str(error)
        }), 500


# ---------------------------------------
# Stop Speech
# ---------------------------------------

@app.route("/stop", methods=["POST"])
def stop():

    try:

        with engine_lock:

            engine.stop()

        return jsonify({
            "success": True,
            "message": "Narration stopped."
        })

    except Exception as error:

        return jsonify({
            "success": False,
            "message": str(error)
        }), 500


# ---------------------------------------
# Upload TXT Story
# ---------------------------------------

@app.route("/upload", methods=["POST"])
def upload():

    try:

        # Check file
        if "file" not in request.files:

            return jsonify({
                "success": False,
                "message": "No file selected."
            }), 400

        file = request.files["file"]

        # Check filename
        if file.filename == "":

            return jsonify({
                "success": False,
                "message": "Please select a file."
            }), 400

        # Check extension
        extension = os.path.splitext(
            file.filename
        )[1].lower()

        if extension != ".txt":

            return jsonify({
                "success": False,
                "message": "Only TXT files are supported."
            }), 400

        # Read file
        content = file.read().decode("utf-8")

        return jsonify({
            "success": True,
            "text": content,
            "filename": file.filename
        })

    except UnicodeDecodeError:

        return jsonify({
            "success": False,
            "message": "Could not read the file. Please use a UTF-8 TXT file."
        }), 400

    except Exception as error:

        return jsonify({
            "success": False,
            "message": str(error)
        }), 500


# ---------------------------------------
# Run Application
# ---------------------------------------

if __name__ == "__main__":

    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )