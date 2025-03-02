cmake_minimum_required(VERSION 3.10.2)

project(nxai-integration)

# Add Scailable C Utilities for all subprojects
add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/nxai-utilities)
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/nxai-utilities/include)

# Add Postprocessor Python project
add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/venueflow-postprocessor-python)

# # Add installation option
install(TARGETS
    DESTINATION /opt/networkoptix-metavms/mediaserver/bin/plugins/nxai_plugin/nxai_manager/postprocessors/
)

# Install postprocessors
install(PROGRAMS
    ${CMAKE_CURRENT_BINARY_DIR}/venueflow-postprocessor-python/venueflow-postprocessor-python
    DESTINATION /opt/networkoptix-metavms/mediaserver/bin/plugins/nxai_plugin/nxai_manager/postprocessors/
)
