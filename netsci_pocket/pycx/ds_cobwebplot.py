# Drawing cobweb plots in Python
#
# Copyright 2008-2012 Hiroki Sayama
# sayama@binghamton.edu
# adapted for netsci_pocket by Toshihiro Tanizawa

# import pylab as PL
from wtforms import Form, FloatField, validators
from matplotlib.backends.backend_agg import FigureCanvasAgg
from matplotlib.figure import Figure
from io import BytesIO
import base64

# parameter setting
# a = 3.5
class InputForm(Form):
    a = FloatField(label = 'a',
                   default = 3.5,
                   validators = [validators.InputRequired()])

# define an iterative map

def f(x, a):
    return a * x * (1 - x)

# draw a curve and a reference line
def draw(a):

    currentValues = [i/100.0 for i in range(100 + 1)]
    nextValues = [f(x, a) for x in currentValues]

    fig = Figure(tight_layout=True)
    ax  = fig.add_subplot(111)

    ax.plot(currentValues, nextValues)
    ax.plot([0, 1], [0, 1])

    # draw a trajectory
    x = 0.1
    maxTime = 100

    resultX = [x]
    resultY = [0]

    for i in range(maxTime):
        resultX.append(x)
        resultY.append(f(x, a))
        x = f(x, a)
        resultX.append(x)
        resultY.append(x)

    ax.plot(resultX, resultY)
    ax.set_title("DS: Cobweb Plot")
    ax.set_xlabel("x")
    ax.set_ylabel("next x")
    ax.grid(True)

    canvas  = FigureCanvasAgg(fig)
    figfile = BytesIO()
    canvas.print_png(figfile)
    figfile.seek(0)
    figdata_png = base64.b64encode(figfile.getvalue())
    return figdata_png.decode('ascii')


if __name__ == '__main__':
    fig_string = draw(a)
    print(fig_string)

# <<< End >>>
