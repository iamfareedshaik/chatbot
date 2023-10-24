from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)
openai.api_key = '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'
chat_messages = []

@app.route('/')
def index():
    return render_template('index.html', chat_messages=chat_messages)

@app.route('/send_message', methods=['POST'])
def send_message():
    user_message = request.form.get('user_input')
    print(user_message);
    chat_messages.append({'user': True, 'message': user_message})

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=user_message,
        max_tokens=2000,
        n = 1,
        temperature = 0.8
    )

    chatbot_response = response.choices[0].text
    print(chatbot_response);
    chat_messages.append({'user': False, 'message': chatbot_response})

    return jsonify({'status': 'OK', 'chatResponse': chatbot_response})

if __name__ == '__main__':
    app.run(debug=True)
