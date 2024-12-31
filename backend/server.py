from flask import Flask
import requests
from huggingface_hub import InferenceClient

app = Flask(__name__)

@app.route("/")
def memb():
    return {"deafult11111":["deafu", "Members2", "Members3"]}




base_url = "https://favqs.com/api/qotd"

def get_quote():
    url = base_url
    response = requests.get(url)
   
    if(response.status_code == 200):
        quote_data = response.json()
        return quote_data
    
    else:
        print("failed to retrieve data ",response)



#members api route
@app.route("/quote")
def quote():
    quote_data = get_quote()
    if quote_data:
        result = quote_data["quote"]["body"]
    return {"quote_data":[result, "Members2", "Members3"]}



if __name__ == "__main__":
    app.run(debug=True)