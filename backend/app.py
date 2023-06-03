from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)


@app.route("/<contentid>")
def example(contentid):
    # the schema will be very important to get right
    return {
        "version": 1,
        "id": contentid,
        "metadata": {},
        "content": """
#Main Topic

Test
---

[Google](https://www.google.com)
""",
        "children": [
            {
                "id": 1,
                "metadata": {},
                "content": """
                <p>Sub-topic 1 <a href="3">Deeper on this topic</a></p>
                """,
                "children": [
                    {
                        "id": 3,
                        "metadata": {},
                        "content": """Deep dive on first sub-topic""",
                        "children": [],
                    }
                ],
            },
            {
                "id": 2,
                "metadata": {},
                "content": """<p>Sub-topic 2</p>""",
                "children": [],
            },
        ],
    }
