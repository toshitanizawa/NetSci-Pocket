---
author:
- Toshihiro Tanizawa
startup: indent
title: Network Science in Your Pocket
---

Introduction
============

This project began on 2016-06-06(Mon), two days after I got back from
NetSci2016 in Seoul. The underlying concept was simple. How great it
would be if I have a tiny server for outreach activities for network
literacy! So I began to build such a tiny server on Raspberry Pi 3 Model
B for the outreach lecture of my own college in the summer of 2016.
Though I do understand this project has yet a lot to be done, some
people tell me that it would be beneficial to the community of network
science if it is publicly available. This is my first GitHub project and
I hope it really is beneficial to the NetSci community, which I feel at
home to be with. Please enjoy and make your own Pocket project!

Cautions
========

This project is uploaded as it is made by myself who is not an expert of
web application development. So it may contain some security holes.
Please pay attention and use these files for your projects at your own
risk.

Image files in this web application are retrieved only from educational
purpose and never with any intention to violate the copyrights of
original images. Please let me know if they might cause any copyright
problems.

python-flask
============

This project heavily relies on a python module, flask, for web
application building. The URL for python-falk is
<http://flask.pocoo.org/>. Install and set up the python-flask module
properly before running the script run~flask~.sh according to the
instruction in <http://flask.pocoo.org/docs/1.0/installation/>.

It is also a good approach to install the flask environment by
virtualenv according to the instruction in
<http://flask.pocoo.org/docs/1.0/installation/#install-virtualenv/>.

If python-flask is properly installed, you can start the web application
of the project by running the bach script run~flask~.sh. This script
runs a tiny http daemon on your local PC waiting for HTTP connection at
port 5000. To see the entry page, access <http://localhost:5000/> from
your web browser.

Virtual Environment
===================

Python3 can construct the virtual environment for this project without
\'virtualenv\'. The following is a step-by-step instruction to construct
a working environment for this project. The only requirement is that
your system has Python3 installed. We assume that you are now in the
directory PWD.

1.  In the first place, introduce the virtual environment by the command

    ``` {.example}
    python3 -m venv venv
    ```

    This command create the directory \'venv\'.

2.  Activate the environment by the command

    ``` {.example}
    . venv/bin/activate
    ```

    (Don\'t forget the first \'.\' (period)!!!)

3.  Install the necessary modules by pip command

    ``` {.example}
    pip install matplotlib
    pip install Flask
    pip install Flask-WTF
    ```

4.  Git clone this project.

    ``` {.example}
    git clone https://github.com/toshitanizawa/NetSci-Pocket.git
    ```

5.  move into the project directory.

    ``` {.example}
    mv NetSci-Pocket
    ```

6.  Run the starting script

    ``` {.example}
    ./run_flask.sh
    ```

7.  Access through your web browser at the asigned port number. (The
    default is 5000.) For example,

    ``` {.example}
    http://(the IP address of the 'Pocket' server):5000
    ```

8.  To stop the server, just kill the server process invoked by
    run~flask~.sh with, for example, ^C (Control-C).

9.  Deactivate the virtual environment by the command

    ``` {.example}
    deactivate
    ```

Change Log
==========

-   2017-09-15: This git repo is created.

-   2018-07-12: Modified to adapt for the latest version of the flask
    module (1.0).

-   2019-05-28: Reorganized and updated after NetSciEd2019 presentation.
