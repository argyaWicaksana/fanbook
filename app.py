import os, json
from os.path import join, dirname
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson import json_util, ObjectId
from flask_cors import CORS

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

MONGODB_URI = os.environ.get("MONGODB_URI")
DB_NAME =  os.environ.get("DB_NAME")

client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
app = Flask(__name__)
# cors = CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app)

def parse_json(data):
    data = json.loads(json_util.dumps(data))
    return data

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/homework", methods=["POST"])
def homework_post():
    nickname = request.json['nickname']
    comment = request.json['comment']
    doc = {
        'nickname': nickname,
        'comment': comment
    }
    db.fanbook.insert_one(doc)
    return jsonify({'msg':'Comment Saved!'})

@app.route("/homework", methods=["GET"])
def homework_get():
    list_fb = list(db.fanbook.find())
    return parse_json(list_fb)

@app.route("/homework/update", methods=["PUT"])
def homework_update():
    id = request.json['id']
    comment = request.json['comment']

    doc = { 'comment': comment }
    db.fanbook.update_one({'_id': ObjectId(id)}, {
        '$set': doc
    })
    return jsonify({'msg':'Comment updated!'})

@app.route("/homework/delete", methods=["DELETE"])
def homework_delete():
    id = request.json['id']

    db.fanbook.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg':'Comment deleted!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)