# A simple simulation of the logistic map in Python
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

# x = 0.1
# a = 4.0
# tmax = 100
# parameter setting
class InputForm(Form):
    x = FloatField(label   = 'x',
                   default = 0.1,
                   validators = [validators.InputRequired()])
    a = FloatField(label = 'a',
                   default = 4.0,
                   validators = [validators.InputRequired()])
    tmax = FloatField(label = 'tmax',
                      default = 100,
                      validators = [validators.InputRequired()])

# model setting
def f(x, a):
    return a * x * (1 - x)

# drawing function
def draw(x, a, tmax):
    "Draw a logistic map"

    xdata = [x]
    for t in range(tmax):
        x = f(x, a)
        xdata.append(x)

    fig = Figure(tight_layout=True)
    ax  = fig.add_subplot(111)

    ax.plot(xdata)
    ax.set_title("DS: Logistic Map")
    ax.set_xlabel("time")
    ax.set_ylabel("x")
    ax.grid(True)

    canvas  = FigureCanvasAgg(fig)
    figfile = BytesIO()
    canvas.print_png(figfile)
    figfile.seek(0)
    figdata_png = base64.b64encode(figfile.getvalue())
    return figdata_png.decode('ascii')




if __name__ == '__main__':
    fig_string = draw(0.1, 4.0, 100)
    print(fig_string)

# <<< End >>>
