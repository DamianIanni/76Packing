if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/damianianni/.gradle/caches/8.10.2/transforms/f4a05e601a3df3c9f0a5859c28121dc5/transformed/hermes-android-0.77.0-debug/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/damianianni/.gradle/caches/8.10.2/transforms/f4a05e601a3df3c9f0a5859c28121dc5/transformed/hermes-android-0.77.0-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

