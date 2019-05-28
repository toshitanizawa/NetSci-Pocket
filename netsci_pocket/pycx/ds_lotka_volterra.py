# Drawing phase space of the Lotka-Volterra model by the Euler forward method in Python
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


# a = 1.0
# b = 0.1
# c = 1.0
# d = 0.1
class InputForm(Form):
    a = FloatField(label = 'a',
                   default = 1.0,
                   validators = [validators.InputRequired()])
    b = FloatField(label = 'b',
                   default = 0.1,
                   validators = [validators.InputRequired()])
    c = FloatField(label = 'c',
                   default = 1.0,
                   validators = [validators.InputRequired()])
    d = FloatField(label = 'd',
                   default = 0.1,
                   validators = [validators.InputRequired()])

dt = 0.1
# model setting
def update(x, y, a, b, c, d):
    return (
        x + (- a * x * y + b * x) * dt,
        y + (c * x * y - d * y) * dt
        )


def draw(a, b, c, d):

    fig = Figure(tight_layout=True)
    ax  = fig.add_subplot(111)

    x0 = 0.1
    while x0 <= 1:
        y0 = 0.1
        while y0 <= 1:
            t = 0
            x = x0
            y = y0
            tdata = [t]
            xdata = [x]
            ydata = [y]
            while t < 100:
                t = t + dt
                (x, y) = update(x, y, a, b, c, d)
                tdata.append(t)
                xdata.append(x)
                ydata.append(y)
            ax.plot(xdata, ydata)
            y0 += 0.1
        x0 += 0.1

    ax.set_title("DS: Lotka Volterra")
    ax.set_xlabel("x")
    ax.set_ylabel("y")
    ax.grid(True)

    canvas  = FigureCanvasAgg(fig)
    figfile = BytesIO()
    canvas.print_png(figfile)
    figfile.seek(0)
    figdata_png = base64.b64encode(figfile.getvalue())
    return figdata_png.decode('ascii')

if __name__=='__main__':
    fig_string = draw(a)

# <<< End >>>
