# Simple CA simulator in Python
#
# *** Majority Rule ***
#
# Copyright 2008-2012 Hiroki Sayama
# sayama@binghamton.edu
#
# adapted for the Pocket project by Toshihiro Tanizawa
# on 2018-07-14(Sat) 17:59

# from wtforms import Form, FloatField, validators
# from matplotlib.backends.backend_agg import FigureCanvasAgg
# from matplotlib.figure import Figure
import matplotlib.cm
import matplotlib.animation as animation
from matplotlib import pyplot as PL
import random as RD
import scipy as SP

# ================================================================
# initial setting
RD.seed()
width = 70
height = 70
numberOfStates = 2
r = 1

# ================================================================
# set up the figure, the axis, and the plot element
fig = PL.figure()
ax  = fig.add_subplot(111, aspect='equal', autoscale_on=False,
                      xlim=(0, width), ylim=(0, height))
ax.grid(False)
ax.set_axis_off()
line, = ax.plot([], [], 'o-')

# === init() ===========================================================
def init():
    global config, nextConfig

    config = SP.zeros([height, width])
    for x in range(width):
        for y in range(height):
            state = RD.randint(0, numberOfStates - 1)
            config[y, x] = state

    ax.cla()
    ax.pcolor(config, cmap = matplotlib.cm.binary)
    ax.set_title('CA: Majority Rule (t = 0)')
    line.set_data([], [])

    nextConfig = SP.zeros([height, width])

    return line,

# === animate() ========================================================
def animate(i):
    global config, nextConfig

    ax.set_title('CA: Majority Rule (t = ' + str(i) + ')')
    for x in range(width):
        for y in range(height):
            state = config[y, x]
            counts = [0] * numberOfStates
            for dx in range(- r, r + 1):
                for dy in range(- r, r + 1):
                    s = int(config[(y+dy)%height, (x+dx)%width])
                    counts[s] += 1
            maxCount = max(counts)
            maxStates = []
            for i in range(numberOfStates):
                if counts[i] == maxCount:
                    maxStates.append(i)
            state = RD.choice(maxStates)
            nextConfig[y, x] = state

    config, nextConfig = nextConfig, config

    ax.set_axis_off()
    ax.pcolor(config, cmap = matplotlib.cm.binary)
    line.set_data([], [])

    return line,
# =======================================================================

# import pycxsimulator
# pycxsimulator.GUI().start(func=[init,draw,step])

# === rendering part ====================================================

anim = animation.FuncAnimation(fig, animate, init_func=init, frames=30, blit=True)

# save the animation as an mp4. This requires ffmpeg or mencoder to be installed.
# The extra_args ensure that the x264 codec is used,
# so that the video can be embedded in html5. You may need to adjust this
# for your system: for more information, see
# http://matplotlib.sourceforge.net/api/animation_api.html
# anim.save('ca_majority.mp4', extra_args=['-vcodec', 'libx264'])

# =======================================================================


if __name__ == '__main__':
    PL.show()

# <<< End >>>
