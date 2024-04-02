# Because we don't have a database and real backend code, we'll build code to check AJAX requests and return some data.
# We'll use the Flask framework to build the backend code.
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return render_template('mainPage.html')

@app.route('/todo/create', methods=['POST'])
def create_todo():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route('/todo/update', methods=['POST'])
def update_todo():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route('/todo/delete', methods=['POST'])
def delete_todo():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route('/todo/get', methods=['GET'])
def get_todo():
    data = {
        'todos': [
            {
                'id': 1,
                'title': 'Todo 1',
                'description': 'Description 1'
            },
            {
                'id': 2,
                'title': 'Todo 2',
                'description': 'Description 2'
            },
            {
                'id': 3,
                'title': 'Todo 3',
                'description': 'Description 3'
            },
            {
                'id': 4,
                'title': 'Todo 4',
                'description': 'Description 4'
            },
            {
                'id': 5,
                'title': 'Todo 5',
                'description': 'Description 5'
            }
        ]
    }
    return jsonify(data)

@app.route('/todo/completed/<id>', methods=['POST'])
def completed_todo(id):
    data = request.get_json()
    data['id'] = id
    print(data)
    return jsonify(data)

@app.route('/todo/uncompleted/<id>', methods=['POST'])
def uncompleted_todo(id):
    data = request.get_json()
    data['id'] = id
    return jsonify(data)


# Group & Tag
@app.route('/todo/group/create', methods=['POST'])
def create_group():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route('/todo/group/update', methods=['POST'])
def update_group():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route('/todo/group/delete', methods=['POST'])
def delete_group():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route('/todo/group/get', methods=['GET'])
def get_group():
    data = {
        'groups': [
            {
                'id': 1,
                'title': 'Group 1',
                'description': 'Description 1'
            },
            {
                'id': 2,
                'title': 'Group 2',
                'description': 'Description 2'
            },
            {
                'id': 3,
                'title': 'Group 3',
                'description': 'Description 3'
            },
            {
                'id': 4,
                'title': 'Group 4',
                'description': 'Description 4'
            },
            {
                'id': 5,
                'title': 'Group 5',
                'description': 'Description 5'
            }
        ]
    }
    return jsonify(data)

@app.route('/todo/tag/create', methods=['POST'])
def create_tag():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route('/todo/tag/update', methods=['POST'])
def update_tag():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route('/todo/tag/delete', methods=['POST'])
def delete_tag():
    data = request.get_json()
    print(data)
    return jsonify(data)





if __name__ == '__main__':
    app.run(debug=True)