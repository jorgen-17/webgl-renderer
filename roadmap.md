On the upcoming versions I would like to add:
1. Documentation for engine
2. Colors
    * UI to switch colors
        1. pick your own color
        2. rainbow color, every vertex is a different color
3. Shape preview: so users can see what they are drawring as they are drawing it
4. Line thickness??
5. make all browsers request "experimental-webgl", accordint to spec if "webgl" works so should "experimental-webgl"
6. gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);???
7. we should probably avoid creating new buffers each draw call, or maybe always delete buffer after its drawn
8. should i use a framebuffer or renderbuffer?
9. avoid rendering objects not in view of the camera?
10. reimplement shapes as triangle strps and fans to possibly be more efficient
11. figure out more efficient way to reduce cycles for verticies added directly to vertexBuffers(i.e. no looping through every frame)
12. look into instanced rendering
13. potential optiization - multiplying the model matrix by viewProjMat once per frame before passing it into the shader so the shader doesnt have to computer it for every single vertex
14. should I use drawElements instead of drawArrays? does this save anything or just a convenience?