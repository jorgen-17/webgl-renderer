On the upcoming versions I would like to add:
1. Documentation for engine
2. Colors
    * UI to switch colors
        1. pick your own color
        2. rainbow color, every vertex is a different color
3. Shape preview: so users can see what they are drawring as they are drawing it
4. Point size/Line thickness
5. Add rotate camera method to renderer
6. make all browsers request "experimental-webgl", accordint to spec if "webgl" works so should "experimental-webgl"
7. is the fact that i set depth to false in the context creation the reason i cant see shapes past one unit away?
8. gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);???
9. cache getParameter() and getUniformLocation() to avoid performance cost
10. we should probably avoid creating new buffers each draw call, or maybe always delete buffer after its drawn
11. should i use a framebuffer or renderbuffer?