# Drawing bifurcation diagrams in Python
#
# Copyright 2008-2012 Hiroki Sayama
# sayama@binghamton.edu
# adapted for netsci_pocket by Toshihiro Tanizawa

from wtforms import Form, FloatField, validators
# import matplotlib.pyplot as PL
from matplotlib.backends.backend_agg import FigureCanvasAgg
from matplotlib.figure import Figure
from io import BytesIO
import base64

# model setting
def f(x, a):
    return a * x * (1 - x)

# x0 = 0.1
# samplingStartTime = 1000
# sampleNumber = 100

# parameter setting
class InputForm(Form):
    x0 = FloatField(label   = 'x0',
                    default = 0.1,
                    validators = [validators.InputRequired()])
    samplingStartTime = FloatField(label = 'samplingStartTime',
                                   default = 1000,
                                   validators = [validators.InputRequired()])
    sampleNumber = FloatField(label = 'sampleNumber',
                              default = 100,
                              validators = [validators.InputRequired()])

# draw a bifurcation diagram
def draw(x0, samplingStartTime, sampleNumber, resolution=100):
    """Draw a bifurcation diagram."""

    resultA = []
    resultX = []

    a = 0
    da = 1/resolution

    while a <= 4.0:
        x = x0
        for t in range(samplingStartTime):
            x = f(x, a)
        for t in range(sampleNumber):
            x = f(x, a)
            resultA.append(a)
            resultX.append(x)
        a += da

    fig = Figure(tight_layout=True)
    ax  = fig.add_subplot(111)

    ax.plot(resultA, resultX, 'bo')
    ax.set_title("DS Bifurcation Diagram")
    ax.set_xlabel("a")
    ax.set_ylabel("final x")
    ax.grid(True)

    # Make matplotlib write to BytesIO() file object and grab
    # return the object's string
    canvas = FigureCanvasAgg(fig)
    figfile = BytesIO()
    canvas.print_png(figfile)
    figfile.seek(0)            # rewind to beginning of file
    figdata_png = base64.b64encode(figfile.getvalue())
    return figdata_png.decode('ascii')  # prevent b'..' in raw output

if __name__=='__main__':
    fig_string = draw(0.1, 1000, 100)
    print(fig_string)

# <<< End >>>
