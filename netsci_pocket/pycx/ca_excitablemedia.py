# Simple CA simulator in Python
#
# *** Waves in excitable media ***
#
# Copyright 2008-2012 Hiroki Sayama
# sayama@binghamton.edu
# adapted for the Pocket project by Toshihiro Tanizawa
# on 2018-07-15(Sun) 17:17

# import matplotlib
# matplotlib.use('TkAgg')
import matplotlib.cm
import matplotlib.animation as animation

import pylab as PL
import random as RD
import scipy as SP

# === initial setting ==============================================
RD.seed()

width = 100
height = 100
initProb = 0.1
maxState = 6

# ==================================================================
# set up the figure, the axis, and the plot element
fig = PL.figure()
ax  = fig.add_subplot(111, aspect='equal', autoscale_on=False,
                      xlim=(0, width), ylim=(0, height))
ax.grid(False)
ax.set_axis_off()
line, = ax.plot([], [], 'o-')

# === init() ========================================================
def init():
    global config, nextConfig

    config = SP.zeros([height, width])
    for x in range(width):
        for y in range(height):
            if RD.random() < initProb:
                state = maxState
            else:
                state = 0
            config[y, x] = state

    ax.cla()
    ax.pcolor(config, cmap = matplotlib.cm.jet)
    ax.set_title('CA: Excitable Media (t = 0)')
    line.set_data([], [])

    nextConfig = SP.zeros([height, width])

    return line,
# ==================================================================

# === animate() ====================================================
def animate(i):
    global config, nextConfig

    for x in range(width):
        for y in range(height):
            state = config[y, x]
            if state == 0:
                num = 0
                for dx in range(-1, 2):
                    for dy in range(-1, 2):
                        if config[(y+dy)%height, (x+dx)%width] == maxState:
                            num += 1
                if RD.random() * 3 < num:
                    state = maxState
                else:
                    state = 0
            else:
                state -= 1
            nextConfig[y, x] = state

    config, nextConfig = nextConfig, config

    ax.set_axis_off()
    ax.set_title('CA: Excitable Media (t = ' + str(i) + ')')
    ax.pcolor(config, cmap = matplotlib.cm.jet)
    line.set_data([], [])

    return line,
# ======================================================================

# === rendering part ===================================================

anim = animation.FuncAnimation(fig, animate, init_func=init, frames=50, blit=True)

# save the animation as an mp4. This requires ffmpeg or mencoder to be installed.
# The extra_args ensure that the x264 codec is used,
# so that the video can be embedded in html5. You may need to adjust this
# for your system: for more information, see
# http://matplotlib.sourceforge.net/api/animation_api.html
# anim.save('ca_excitablemedia.mp4', extra_args=['-vcodec', 'libx264'])

# =====================================================================


if __name__ == '__main__':
    PL.show()

# <<< End >>>

# import pycxsimulator
# pycxsimulator.GUI().start(func=[init,draw,step])