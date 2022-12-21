import os
from os.path import join, dirname
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

MONGODB_URI = os.environ.get("MONGODB_URI")
DB_NAME =  os.environ.get("DB_NAME")

client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/homework", methods=["POST"])
def homework_post():
    print('tes')
    nickname = request.form['nickname']
    comment = request.form['comment']
    doc = {
        'nickname': nickname,
        'comment': comment
    }
    db.fanbook.insert_one(doc)
    return jsonify({'msg':'Comment Saved!'})

@app.route("/homework", methods=["GET"])
def homework_get():
    list_fb = list(db.fanbook.find({}, {'_id': False}))
    return jsonify({'fanbooks': list_fb})

if __name__ == '__main__':
    app.run('localhost', port=5000, debug=True)