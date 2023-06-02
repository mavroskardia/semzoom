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
                    Seems like the content can be HTML, but then I might
                    have to hijack anchor tags?
                    <a href="#1">To first child</a>
                </p>
                <p>
                    Maybe that's fine.
                    <a href="#2">To second child</a>
                </p>
            </div>
        """,
        "children": [
            {
                "id": 1,
                "metadata": {},
                "content": """<p>bottom of this branch</p>""",
                "children": [],
            },
            {
                "id": 2,
                "metadata": {},
                "content": """<p>bottom of the second branch</p>""",
                "children": [],
            },
        ],
    }
