On the upcoming versions I would like to add:
1. Documentation for engine
2. Colors
    * UI to switch colors
        1. pick your own color
        2. rainbow color, every vertex is a different color
3. Shape preview: so users can see what they are drawring as they are drawing it
4. Line thickness??
5. Add rotate camera method to renderer
6. make all browsers request "experimental-webgl", accordint to spec if "webgl" works so should "experimental-webgl"
7. gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);???
8. we should probably avoid creating new buffers each draw call, or maybe always delete buffer after its drawn
9. should i use a framebuffer or renderbuffer?
10. avoid rendering objects not in view of the camera?
11. reimplement shapes as triangle strps and fans to possibly be more efficient
12. figure out more efficient way to reduce cycles for verticies added directly to vertexBuffers(i.e. no looping through every frame)
13. look into instanced rendering
