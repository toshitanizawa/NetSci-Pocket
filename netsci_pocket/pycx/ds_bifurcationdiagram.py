# Drawing bifurcation diagrams in Python
#
# Copyright 2008-2012 Hiroki Sayama
# sayama@binghamton.edu
# adapted for netsci_pocket by Toshihiro Tanizawa
# tanizawa@ee.kochi-ct.ac.jp

import matplotlib.pylab as PL

# define an iterative map

def f(x, a):
    return a * x * (1 - x)

# draw a bifurcation diagram
# x0 = 0.1
# samplingStartTime = 1000
# sampleNumber = 100

# Model settings
from wtforms import Form, FloatField, validators

class InputForm(Form):
    x0 = FloatField(
        label = 'x0', default=0.1,
        validators=[validators.InputRequired()])
    samplingStartTime = FloatField(
        label = 'samplingStartTime', default=1000,
        validators=[validators.InputRequired()])
    sampleNumber = FloatField(
        label = 'sampleNumber', default=100,
        validators=[validators.InputRequired()])

# Plotting function
def draw(x0, samplingStartTime, sampleNumber, resolution=500):
    """Draw a bifurcation diagram."""

    resultA = []
    resultX = []

    a = 0
    da = 0.01

    while a <= 4.0:
        x = x0
        for t in xrange(samplingStartTime):
            x = f(x, a)
        for t in xrange(sampleNumber):
            x = f(x, a)
            resultA.append(a)
            resultX.append(x)
        a += da

    PL.figure()
    PL.plot(resultA, resultX, 'bo')

    # Make Matplotlib write to BytesIO() file object and grab
    # return the object's string
    from io import BytesIO
    figfile = BytesIO()
    PL.savefig(figfile, format='png')
    figfile.read1(0)             # rewind to beginning of file
    import base64
    figdata_png = base64.b64encode(figfile.getvalue())
    return figdata_png

if __name__=='__main__':
    draw(0.1, 1000, 100)
    PL.show()

# <<< End >>>
