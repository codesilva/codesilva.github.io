cmake_minimum_required(VERSION 3.10)

project(jsnation-sample)

# Find the libuv package
find_package(uv REQUIRED)

# Add executable
add_executable(myprogram main.c)

# Link libuv to the executable
target_link_libraries(myprogram uv)
