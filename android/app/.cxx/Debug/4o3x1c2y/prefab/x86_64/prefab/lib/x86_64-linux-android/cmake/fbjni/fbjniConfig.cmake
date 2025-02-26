if(NOT TARGET fbjni::fbjni)
add_library(fbjni::fbjni SHARED IMPORTED)
set_target_properties(fbjni::fbjni PROPERTIES
    IMPORTED_LOCATION "/Users/damianianni/.gradle/caches/8.10.2/transforms/dae0c6b59e4c0b1bfcdd80496e3b9df1/transformed/fbjni-0.7.0/prefab/modules/fbjni/libs/android.x86_64/libfbjni.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/damianianni/.gradle/caches/8.10.2/transforms/dae0c6b59e4c0b1bfcdd80496e3b9df1/transformed/fbjni-0.7.0/prefab/modules/fbjni/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

