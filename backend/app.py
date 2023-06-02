from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)


@app.route("/example")
def example():
    print("returning example data")

    # the schema will be very important to get right
    # seems like it will have to be a recursive thing
    return {
        "version": 1,
        "id": 0,
        "metadata": {},
        "content": """
            <div>
                <p>
                    Main Topic
                    <a href="/1">To first sub-topic</a>
                </p>
                <p>
                    Maybe that's fine.
                    <a href="/2">To second sub-topic</a>
                </p>
            </div>
        """,
        "children": [
            {
                "id": 1,
                "metadata": {},
                "content": """
                <p>Sub-topic 1 <a href="/3">Deeper on this topic</a></p>
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
