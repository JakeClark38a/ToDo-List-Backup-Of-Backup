# Hello World in Python Flask

from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def logout():
    return render_template('mainPageBodyTemplate.html')

data = {
    "username": "JakeClark",
    "userid": "User ID",
    "groups": {
        "gid001": {
            "title": "Do",
            "tags": ["tag1"],
            "def_tag": "do",
            "color": "#7aa5cf",
            "current_html": ""
        },
        "gid002": {
            "title": "Delegate",
            "tags": ["tag2"],
            "def_tag": "delegate",
            "color": "#63c074",
            "current_html": ""
        },
        "gid003": {
            "title": "Schedule",
            "tags": ["tag3", "tag5"],
            "def_tag": "schedule",
            "color": "#ac7acf",
            "current_html": ""
        },
        "gid004": {
            "title": "Later",
            "tags": ["tag4"],
            "def_tag": "later",
            "color": "#c5e875",
            "current_html": ""
        }
    },
    "tasks": {
        "id001": {
            "title": "Meeting",
            "description": "About making a website",
            "tag": "tag1",
            "deadline": 62783,
            "points": 4
        },
        "id002": {
            "title": "Crying",
            "description": "About making a website",
            "tag": "tag3",
            "deadline": 62783,
            "points": 4
        },
        "id004": {
            "title": "Laughing",
            "description": "About making a website",
            "tag": "tag5",
            "deadline": 62783,
            "points": 4
        }
    },
    "completed": {
        "id003": {
            "title": "Journaling",
            "description": "About making a website",
            "tag": "tag1",
            "deadline": 62783,
            "points": 5
        }
    },
    "tags": {
        "do": {
            "title": "Do",
            "color": "#7aa5cf",
            "groupId": "gid001",
            "deleteable": False,
            "editable": False,
            "display": False
        },
        "delegate": {
            "title": "Delegate",
            "color": "#63c074",
            "groupId": "gid002",
            "deleteable": False,
            "editable": False,
            "display": False
        },
        "schedule": {
            "title": "Schedule",
            "color": "#ac7acf",
            "groupId": "gid003",
            "deleteable": False,
            "editable": False,
            "display": False
        },
        "later": {
            "title": "Later",
            "color": "#c5e875",
            "groupId": "gid004",
            "deleteable": False,
            "editable": False,
            "display": False
        },
        "tag1": {
            "title": "tag1",
            "color": "#7aa5cf",
            "groupId": "gid001",
            "deleteable": True,
            "editable": True,
            "display": True
        },
        "tag2": {
            "title": "tag2",
            "color": "#63c074",
            "groupId": "gid002",
            "deleteable": True,
            "editable": True,
            "display": True
        },
        "tag3": {
            "title": "tag3",
            "color": "#ac7acf",
            "groupId": "gid003",
            "deleteable": True,
            "editable": True,
            "display": True
        },
        "tag4": {
            "title": "tag4",
            "color": "#c5e875",
            "groupId": "gid004",
            "deleteable": True,
            "editable": True,
            "display": True
        },
        "tag5": {
            "title": "tag5",
            "color": "#f7d38c",
            "groupId": "gid003",
            "deleteable": True,
            "editable": True,
            "display": True
        },
        "none": {
            "title": "none",
            "color": "#ffffff",
            "deleteable": False,
            "editable": False,
            "display": False
        }
    }
}

@app.route('/todo/get')
def getDict():
    return data

@app.route("/todo/group/create", methods=['POST'])
def addGroup():
    data = request.get_json()
    print(data)
    return jsonify(data)

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=3000)