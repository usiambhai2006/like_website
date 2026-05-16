from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/send_like", methods=["POST"])
def send_like():

    data = request.json

    uid = data.get("uid")
    region = data.get("region")

    api_url = f"https://free-like-api.onrender.com/like?uid={uid}&server_name={region}&key=STAR"

    try:
        response = requests.get(api_url)
        result = response.json()

        return jsonify(result)

    except Exception as e:
        return jsonify({
            "error": str(e)
        })

if __name__ == "__main__":
    app.run(debug=True)