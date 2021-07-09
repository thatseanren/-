# FAWAI, Training Dataset WareHouse Application Specification -- SIYANGREN

1. Before starting an application, to gain the overal understanding of existence of such application is always the first thing to be done.
2. So, to achieve this overal understanding, we need to create a [_Appilication Specification_](zesium.com/how-to-create-a-mobile-app-specification/) from which our engineers can gain knowledge.
3. Requirement of a application specification:
   **Clear** && **Detailed** && **NOT AMBIGUOUS && STRAIGHT TO THE POINT**

# Startup Introduction

FAWAI is a autonomous driving componay dedecated to output world class L4 Autonomous Driving platform. FAWAI is wholly-owned by FAW, it is the first and biggest state-owned car manufacturer in China. It is commited to build high performance, well quality cars. Autonomous Driving project is launched in earlier 2010, and with the demand of autonomous vehicles grew and the technology of autonomous driving is getting mature, FAWAI is founded earlier 2020 with a mission given by the FAW headquater, that is delivering L4 autonomous driving platform which is exlusive to HONGQI brand.

# APP IDEA

We are looking to develop a integrated dashboard-like Web Application, offers dataset annotation task allocation, dataset presentation. We are targeting people who are in autonomous driving industry, so they can use our application to manage their dataset for training and labeling.

# Technology stack and platforms

The initial stage will be targeting users on browser, including _mainstream browsers_ like chrome, firefox, on any desktop or tablet.
We will be using *React@17.0.1* to make the application a component-based application.
We will be using _flask_ as our backend service, _socket.io_ as our communication method.

# Features

1. Unpack Dataset 

    _React_ will provide an UI to emit allocation events to _flask_
   _flask_ receives the request concerning with dataset, it initializes the _mongodb_ action accordingly, generates a pod for that task usually the task generates bunch of folders, and adds a record of the folders to the _mongodb_ .

2. Annotation task allocation

    User can allocate the annotation task to a specific user, and task can be rearranged to another. _mongodb_ will keep a record of the task and the annotator. 

3. Synchronousing annotation result
    when a annotation is drew it will be passed through socket to backend and saved. 
