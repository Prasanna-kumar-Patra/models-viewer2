

## heart view
https://sketchfab.com/3d-models/cardiac-anatomy-external-view-of-human-heart-a3f0ea2030214a6bbaa97e7357eebd58

## editor
https://modelviewer.dev/editor/

## lungs
https://sketchfab.com/3d-models/anatomy-of-the-airways-ad7d7e16b98f421db0cda79f265fcc8d


upload glb
edit data of model-viewer and paste current one if available

zoom properly to match the sketchfab one
add hotsopt
copy paste hotspot label

go to Camera Setup tab > save current as initaial
// this will generate the camera-orbit data which will be used in button as data-orbit
Then change the Target point to create camera-target="0.12m 0.03944m 0.203m"

Then copy data to a new data file temporarily named as hotspot9.html
then change the button data: copy orbit and target data of camera from model viewer props to button props 
and chage camera to data : eg >  
camera-target="0.12m 0.03944m 0.203m" to data-target="0.12m 0.03944m 0.203m"
camera-orbit="-68.76deg 83.57deg 3.886m" to data-orbit="-68.76deg 83.57deg 3.886m"
 and add the hotspot number inside label div
 


  ## to do

 - [x] autoplay 
 - [x] audio
 - [x] pause
 - [ ] title change
 - [ ] increage click area
 - [ ] manual zoom
 - [ ] poster
 - [ ] description
 - [ ] menu 
 - [ ] fix navigation width