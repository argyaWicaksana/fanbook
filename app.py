from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

client = MongoClient("mongodb+srv://mongotest:mongotestpassword@cluster0.rgqtpq6.mongodb.net/?retryWrites=true&w=majority")
db = client.dbLearningx
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