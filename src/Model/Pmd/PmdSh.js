const fs=require('fs');
const path=require('path');

// Include libs/gl-matrix.js
//region
    /*
 * gl-matrix.js - High performance matrix and vector operations for WebGL
 * Version 1.0.1
 */

    /*
     * Copyright (c) 2011 Brandon Jones
     *
     * This software is provided 'as-is', without any express or implied
     * warranty. In no event will the authors be held liable for any damages
     * arising from the use of this software.
     *
     * Permission is granted to anyone to use this software for any purpose,
     * including commercial applications, and to alter it and redistribute it
     * freely, subject to the following restrictions:
     *
     *    1. The origin of this software must not be misrepresented; you must not
     *    claim that you wrote the original software. If you use this software
     *    in a product, an acknowledgment in the product documentation would be
     *    appreciated but is not required.
     *
     *    2. Altered source versions must be plainly marked as such, and must not
     *    be misrepresented as being the original software.
     *
     *    3. This notice may not be removed or altered from any source
     *    distribution.
     */

    "use strict";

// Type declarations
    var MatrixArray = (typeof Float32Array !== 'undefined') ? Float32Array : Array, // Fallback for systems that don't support TypedArrays
        glMatrixArrayType = MatrixArray, // For Backwards compatibility
        vec3 = {},
        mat3 = {},
        mat4 = {},
        quat4 = {};


    /*
     * vec3 - 3 Dimensional Vector
     */

    /*
     * vec3.create
     * Creates a new instance of a vec3 using the default array type
     * Any javascript array containing at least 3 numeric elements can serve as a vec3
     *
     * Params:
     * vec - Optional, vec3 containing values to initialize with
     *
     * Returns:
     * New vec3
     */
    vec3.create = function (vec) {
        var dest = new MatrixArray(3);

        if (vec) {
            dest[0] = vec[0];
            dest[1] = vec[1];
            dest[2] = vec[2];
        }

        return dest;
    };

    /*
     * vec3.set
     * Copies the values of one vec3 to another
     *
     * Params:
     * vec - vec3 containing values to copy
     * dest - vec3 receiving copied values
     *
     * Returns:
     * dest
     */
    vec3.set = function (vec, dest) {
        dest[0] = vec[0];
        dest[1] = vec[1];
        dest[2] = vec[2];

        return dest;
    };

    /*
     * vec3.add
     * Performs a vector addition
     *
     * Params:
     * vec - vec3, first operand
     * vec2 - vec3, second operand
     * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
     *
     * Returns:
     * dest if specified, vec otherwise
     */
    vec3.add = function (vec, vec2, dest) {
        if (!dest || vec === dest) {
            vec[0] += vec2[0];
            vec[1] += vec2[1];
            vec[2] += vec2[2];
            return vec;
        }

        dest[0] = vec[0] + vec2[0];
        dest[1] = vec[1] + vec2[1];
        dest[2] = vec[2] + vec2[2];
        return dest;
    };

    /*
     * vec3.subtract
     * Performs a vector subtraction
     *
     * Params:
     * vec - vec3, first operand
     * vec2 - vec3, second operand
     * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
     *
     * Returns:
     * dest if specified, vec otherwise
     */
    vec3.subtract = function (vec, vec2, dest) {
        if (!dest || vec === dest) {
            vec[0] -= vec2[0];
            vec[1] -= vec2[1];
            vec[2] -= vec2[2];
            return vec;
        }

        dest[0] = vec[0] - vec2[0];
        dest[1] = vec[1] - vec2[1];
        dest[2] = vec[2] - vec2[2];
        return dest;
    };

    /*
     * vec3.negate
     * Negates the components of a vec3
     *
     * Params:
     * vec - vec3 to negate
     * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
     *
     * Returns:
     * dest if specified, vec otherwise
     */
    vec3.negate = function (vec, dest) {
        if (!dest) { dest = vec; }

        dest[0] = -vec[0];
        dest[1] = -vec[1];
        dest[2] = -vec[2];
        return dest;
    };

    /*
     * vec3.scale
     * Multiplies the components of a vec3 by a scalar value
     *
     * Params:
     * vec - vec3 to scale
     * val - Numeric value to scale by
     * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
     *
     * Returns:
     * dest if specified, vec otherwise
     */
    vec3.scale = function (vec, val, dest) {
        if (!dest || vec === dest) {
            vec[0] *= val;
            vec[1] *= val;
            vec[2] *= val;
            return vec;
        }

        dest[0] = vec[0] * val;
        dest[1] = vec[1] * val;
        dest[2] = vec[2] * val;
        return dest;
    };

    /*
     * vec3.normalize
     * Generates a unit vector of the same direction as the provided vec3
     * If vector length is 0, returns [0, 0, 0]
     *
     * Params:
     * vec - vec3 to normalize
     * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
     *
     * Returns:
     * dest if specified, vec otherwise
     */
    vec3.normalize = function (vec, dest) {
        if (!dest) { dest = vec; }

        var x = vec[0], y = vec[1], z = vec[2],
            len = Math.sqrt(x * x + y * y + z * z);

        if (!len) {
            dest[0] = 0;
            dest[1] = 0;
            dest[2] = 0;
            return dest;
        } else if (len === 1) {
            dest[0] = x;
            dest[1] = y;
            dest[2] = z;
            return dest;
        }

        len = 1 / len;
        dest[0] = x * len;
        dest[1] = y * len;
        dest[2] = z * len;
        return dest;
    };

    /*
     * vec3.cross
     * Generates the cross product of two vec3s
     *
     * Params:
     * vec - vec3, first operand
     * vec2 - vec3, second operand
     * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
     *
     * Returns:
     * dest if specified, vec otherwise
     */
    vec3.cross = function (vec, vec2, dest) {
        if (!dest) { dest = vec; }

        var x = vec[0], y = vec[1], z = vec[2],
            x2 = vec2[0], y2 = vec2[1], z2 = vec2[2];

        dest[0] = y * z2 - z * y2;
        dest[1] = z * x2 - x * z2;
        dest[2] = x * y2 - y * x2;
        return dest;
    };

    /*
     * vec3.length
     * Caclulates the length of a vec3
     *
     * Params:
     * vec - vec3 to calculate length of
     *
     * Returns:
     * Length of vec
     */
    vec3.length = function (vec) {
        var x = vec[0], y = vec[1], z = vec[2];
        return Math.sqrt(x * x + y * y + z * z);
    };

    /*
     * vec3.dot
     * Caclulates the dot product of two vec3s
     *
     * Params:
     * vec - vec3, first operand
     * vec2 - vec3, second operand
     *
     * Returns:
     * Dot product of vec and vec2
     */
    vec3.dot = function (vec, vec2) {
        return vec[0] * vec2[0] + vec[1] * vec2[1] + vec[2] * vec2[2];
    };

    /*
     * vec3.direction
     * Generates a unit vector pointing from one vector to another
     *
     * Params:
     * vec - origin vec3
     * vec2 - vec3 to point to
     * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
     *
     * Returns:
     * dest if specified, vec otherwise
     */
    vec3.direction = function (vec, vec2, dest) {
        if (!dest) { dest = vec; }

        var x = vec[0] - vec2[0],
            y = vec[1] - vec2[1],
            z = vec[2] - vec2[2],
            len = Math.sqrt(x * x + y * y + z * z);

        if (!len) {
            dest[0] = 0;
            dest[1] = 0;
            dest[2] = 0;
            return dest;
        }

        len = 1 / len;
        dest[0] = x * len;
        dest[1] = y * len;
        dest[2] = z * len;
        return dest;
    };

    /*
     * vec3.lerp
     * Performs a linear interpolation between two vec3
     *
     * Params:
     * vec - vec3, first vector
     * vec2 - vec3, second vector
     * lerp - interpolation amount between the two inputs
     * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
     *
     * Returns:
     * dest if specified, vec otherwise
     */
    vec3.lerp = function (vec, vec2, lerp, dest) {
        if (!dest) { dest = vec; }

        dest[0] = vec[0] + lerp * (vec2[0] - vec[0]);
        dest[1] = vec[1] + lerp * (vec2[1] - vec[1]);
        dest[2] = vec[2] + lerp * (vec2[2] - vec[2]);

        return dest;
    };

    /*
     * vec3.str
     * Returns a string representation of a vector
     *
     * Params:
     * vec - vec3 to represent as a string
     *
     * Returns:
     * string representation of vec
     */
    vec3.str = function (vec) {
        return '[' + vec[0] + ', ' + vec[1] + ', ' + vec[2] + ']';
    };

    /*
     * mat3 - 3x3 Matrix
     */

    /*
     * mat3.create
     * Creates a new instance of a mat3 using the default array type
     * Any javascript array containing at least 9 numeric elements can serve as a mat3
     *
     * Params:
     * mat - Optional, mat3 containing values to initialize with
     *
     * Returns:
     * New mat3
     */
    mat3.create = function (mat) {
        var dest = new MatrixArray(9);

        if (mat) {
            dest[0] = mat[0];
            dest[1] = mat[1];
            dest[2] = mat[2];
            dest[3] = mat[3];
            dest[4] = mat[4];
            dest[5] = mat[5];
            dest[6] = mat[6];
            dest[7] = mat[7];
            dest[8] = mat[8];
        }

        return dest;
    };

    /*
     * mat3.set
     * Copies the values of one mat3 to another
     *
     * Params:
     * mat - mat3 containing values to copy
     * dest - mat3 receiving copied values
     *
     * Returns:
     * dest
     */
    mat3.set = function (mat, dest) {
        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[3];
        dest[4] = mat[4];
        dest[5] = mat[5];
        dest[6] = mat[6];
        dest[7] = mat[7];
        dest[8] = mat[8];
        return dest;
    };

    /*
     * mat3.identity
     * Sets a mat3 to an identity matrix
     *
     * Params:
     * dest - mat3 to set
     *
     * Returns:
     * dest
     */
    mat3.identity = function (dest) {
        if (!dest) { dest = mat3.create(); }
        dest[0] = 1;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        dest[4] = 1;
        dest[5] = 0;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = 1;
        return dest;
    };

    /*
     * mat4.transpose
     * Transposes a mat3 (flips the values over the diagonal)
     *
     * Params:
     * mat - mat3 to transpose
     * dest - Optional, mat3 receiving transposed values. If not specified result is written to mat
     *
     * Returns:
     * dest is specified, mat otherwise
     */
    mat3.transpose = function (mat, dest) {
        // If we are transposing ourselves we can skip a few steps but have to cache some values
        if (!dest || mat === dest) {
            var a01 = mat[1], a02 = mat[2],
                a12 = mat[5];

            mat[1] = mat[3];
            mat[2] = mat[6];
            mat[3] = a01;
            mat[5] = mat[7];
            mat[6] = a02;
            mat[7] = a12;
            return mat;
        }

        dest[0] = mat[0];
        dest[1] = mat[3];
        dest[2] = mat[6];
        dest[3] = mat[1];
        dest[4] = mat[4];
        dest[5] = mat[7];
        dest[6] = mat[2];
        dest[7] = mat[5];
        dest[8] = mat[8];
        return dest;
    };

    /*
     * mat3.toMat4
     * Copies the elements of a mat3 into the upper 3x3 elements of a mat4
     *
     * Params:
     * mat - mat3 containing values to copy
     * dest - Optional, mat4 receiving copied values
     *
     * Returns:
     * dest if specified, a new mat4 otherwise
     */
    mat3.toMat4 = function (mat, dest) {
        if (!dest) { dest = mat4.create(); }

        dest[15] = 1;
        dest[14] = 0;
        dest[13] = 0;
        dest[12] = 0;

        dest[11] = 0;
        dest[10] = mat[8];
        dest[9] = mat[7];
        dest[8] = mat[6];

        dest[7] = 0;
        dest[6] = mat[5];
        dest[5] = mat[4];
        dest[4] = mat[3];

        dest[3] = 0;
        dest[2] = mat[2];
        dest[1] = mat[1];
        dest[0] = mat[0];

        return dest;
    };

    /*
     * mat3.str
     * Returns a string representation of a mat3
     *
     * Params:
     * mat - mat3 to represent as a string
     *
     * Returns:
     * string representation of mat
     */
    mat3.str = function (mat) {
        return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] +
            ', ' + mat[3] + ', ' + mat[4] + ', ' + mat[5] +
            ', ' + mat[6] + ', ' + mat[7] + ', ' + mat[8] + ']';
    };

    /*
     * mat4 - 4x4 Matrix
     */

    /*
     * mat4.create
     * Creates a new instance of a mat4 using the default array type
     * Any javascript array containing at least 16 numeric elements can serve as a mat4
     *
     * Params:
     * mat - Optional, mat4 containing values to initialize with
     *
     * Returns:
     * New mat4
     */
    mat4.create = function (mat) {
        var dest = new MatrixArray(16);

        if (mat) {
            dest[0] = mat[0];
            dest[1] = mat[1];
            dest[2] = mat[2];
            dest[3] = mat[3];
            dest[4] = mat[4];
            dest[5] = mat[5];
            dest[6] = mat[6];
            dest[7] = mat[7];
            dest[8] = mat[8];
            dest[9] = mat[9];
            dest[10] = mat[10];
            dest[11] = mat[11];
            dest[12] = mat[12];
            dest[13] = mat[13];
            dest[14] = mat[14];
            dest[15] = mat[15];
        }

        return dest;
    };

    /*
     * mat4.set
     * Copies the values of one mat4 to another
     *
     * Params:
     * mat - mat4 containing values to copy
     * dest - mat4 receiving copied values
     *
     * Returns:
     * dest
     */
    mat4.set = function (mat, dest) {
        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[3];
        dest[4] = mat[4];
        dest[5] = mat[5];
        dest[6] = mat[6];
        dest[7] = mat[7];
        dest[8] = mat[8];
        dest[9] = mat[9];
        dest[10] = mat[10];
        dest[11] = mat[11];
        dest[12] = mat[12];
        dest[13] = mat[13];
        dest[14] = mat[14];
        dest[15] = mat[15];
        return dest;
    };

    /*
     * mat4.identity
     * Sets a mat4 to an identity matrix
     *
     * Params:
     * dest - mat4 to set
     *
     * Returns:
     * dest
     */
    mat4.identity = function (dest) {
        if (!dest) { dest = mat4.create(); }
        dest[0] = 1;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        dest[4] = 0;
        dest[5] = 1;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = 0;
        dest[9] = 0;
        dest[10] = 1;
        dest[11] = 0;
        dest[12] = 0;
        dest[13] = 0;
        dest[14] = 0;
        dest[15] = 1;
        return dest;
    };

    /*
     * mat4.transpose
     * Transposes a mat4 (flips the values over the diagonal)
     *
     * Params:
     * mat - mat4 to transpose
     * dest - Optional, mat4 receiving transposed values. If not specified result is written to mat
     *
     * Returns:
     * dest is specified, mat otherwise
     */
    mat4.transpose = function (mat, dest) {
        // If we are transposing ourselves we can skip a few steps but have to cache some values
        if (!dest || mat === dest) {
            var a01 = mat[1], a02 = mat[2], a03 = mat[3],
                a12 = mat[6], a13 = mat[7],
                a23 = mat[11];

            mat[1] = mat[4];
            mat[2] = mat[8];
            mat[3] = mat[12];
            mat[4] = a01;
            mat[6] = mat[9];
            mat[7] = mat[13];
            mat[8] = a02;
            mat[9] = a12;
            mat[11] = mat[14];
            mat[12] = a03;
            mat[13] = a13;
            mat[14] = a23;
            return mat;
        }

        dest[0] = mat[0];
        dest[1] = mat[4];
        dest[2] = mat[8];
        dest[3] = mat[12];
        dest[4] = mat[1];
        dest[5] = mat[5];
        dest[6] = mat[9];
        dest[7] = mat[13];
        dest[8] = mat[2];
        dest[9] = mat[6];
        dest[10] = mat[10];
        dest[11] = mat[14];
        dest[12] = mat[3];
        dest[13] = mat[7];
        dest[14] = mat[11];
        dest[15] = mat[15];
        return dest;
    };

    /*
     * mat4.determinant
     * Calculates the determinant of a mat4
     *
     * Params:
     * mat - mat4 to calculate determinant of
     *
     * Returns:
     * determinant of mat
     */
    mat4.determinant = function (mat) {
        // Cache the matrix values (makes for huge speed increases!)
        var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
            a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
            a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
            a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];

        return (a30 * a21 * a12 * a03 - a20 * a31 * a12 * a03 - a30 * a11 * a22 * a03 + a10 * a31 * a22 * a03 +
            a20 * a11 * a32 * a03 - a10 * a21 * a32 * a03 - a30 * a21 * a02 * a13 + a20 * a31 * a02 * a13 +
            a30 * a01 * a22 * a13 - a00 * a31 * a22 * a13 - a20 * a01 * a32 * a13 + a00 * a21 * a32 * a13 +
            a30 * a11 * a02 * a23 - a10 * a31 * a02 * a23 - a30 * a01 * a12 * a23 + a00 * a31 * a12 * a23 +
            a10 * a01 * a32 * a23 - a00 * a11 * a32 * a23 - a20 * a11 * a02 * a33 + a10 * a21 * a02 * a33 +
            a20 * a01 * a12 * a33 - a00 * a21 * a12 * a33 - a10 * a01 * a22 * a33 + a00 * a11 * a22 * a33);
    };

    /*
     * mat4.inverse
     * Calculates the inverse matrix of a mat4
     *
     * Params:
     * mat - mat4 to calculate inverse of
     * dest - Optional, mat4 receiving inverse matrix. If not specified result is written to mat
     *
     * Returns:
     * dest is specified, mat otherwise
     */
    mat4.inverse = function (mat, dest) {
        if (!dest) { dest = mat; }

        // Cache the matrix values (makes for huge speed increases!)
        var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
            a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
            a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
            a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15],

            b00 = a00 * a11 - a01 * a10,
            b01 = a00 * a12 - a02 * a10,
            b02 = a00 * a13 - a03 * a10,
            b03 = a01 * a12 - a02 * a11,
            b04 = a01 * a13 - a03 * a11,
            b05 = a02 * a13 - a03 * a12,
            b06 = a20 * a31 - a21 * a30,
            b07 = a20 * a32 - a22 * a30,
            b08 = a20 * a33 - a23 * a30,
            b09 = a21 * a32 - a22 * a31,
            b10 = a21 * a33 - a23 * a31,
            b11 = a22 * a33 - a23 * a32,

            // Calculate the determinant (inlined to avoid double-caching)
            invDet = 1 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);

        dest[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
        dest[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
        dest[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
        dest[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
        dest[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
        dest[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
        dest[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
        dest[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
        dest[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
        dest[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
        dest[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
        dest[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
        dest[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
        dest[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
        dest[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
        dest[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;

        return dest;
    };

    /*
     * mat4.toRotationMat
     * Copies the upper 3x3 elements of a mat4 into another mat4
     *
     * Params:
     * mat - mat4 containing values to copy
     * dest - Optional, mat4 receiving copied values
     *
     * Returns:
     * dest is specified, a new mat4 otherwise
     */
    mat4.toRotationMat = function (mat, dest) {
        if (!dest) { dest = mat4.create(); }

        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[3];
        dest[4] = mat[4];
        dest[5] = mat[5];
        dest[6] = mat[6];
        dest[7] = mat[7];
        dest[8] = mat[8];
        dest[9] = mat[9];
        dest[10] = mat[10];
        dest[11] = mat[11];
        dest[12] = 0;
        dest[13] = 0;
        dest[14] = 0;
        dest[15] = 1;

        return dest;
    };

    /*
     * mat4.toMat3
     * Copies the upper 3x3 elements of a mat4 into a mat3
     *
     * Params:
     * mat - mat4 containing values to copy
     * dest - Optional, mat3 receiving copied values
     *
     * Returns:
     * dest is specified, a new mat3 otherwise
     */
    mat4.toMat3 = function (mat, dest) {
        if (!dest) { dest = mat3.create(); }

        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[4];
        dest[4] = mat[5];
        dest[5] = mat[6];
        dest[6] = mat[8];
        dest[7] = mat[9];
        dest[8] = mat[10];

        return dest;
    };

    /*
     * mat4.toInverseMat3
     * Calculates the inverse of the upper 3x3 elements of a mat4 and copies the result into a mat3
     * The resulting matrix is useful for calculating transformed normals
     *
     * Params:
     * mat - mat4 containing values to invert and copy
     * dest - Optional, mat3 receiving values
     *
     * Returns:
     * dest is specified, a new mat3 otherwise
     */
    mat4.toInverseMat3 = function (mat, dest) {
        // Cache the matrix values (makes for huge speed increases!)
        var a00 = mat[0], a01 = mat[1], a02 = mat[2],
            a10 = mat[4], a11 = mat[5], a12 = mat[6],
            a20 = mat[8], a21 = mat[9], a22 = mat[10],

            b01 = a22 * a11 - a12 * a21,
            b11 = -a22 * a10 + a12 * a20,
            b21 = a21 * a10 - a11 * a20,

            d = a00 * b01 + a01 * b11 + a02 * b21,
            id;

        if (!d) { return null; }
        id = 1 / d;

        if (!dest) { dest = mat3.create(); }

        dest[0] = b01 * id;
        dest[1] = (-a22 * a01 + a02 * a21) * id;
        dest[2] = (a12 * a01 - a02 * a11) * id;
        dest[3] = b11 * id;
        dest[4] = (a22 * a00 - a02 * a20) * id;
        dest[5] = (-a12 * a00 + a02 * a10) * id;
        dest[6] = b21 * id;
        dest[7] = (-a21 * a00 + a01 * a20) * id;
        dest[8] = (a11 * a00 - a01 * a10) * id;

        return dest;
    };

    /*
     * mat4.multiply
     * Performs a matrix multiplication
     *
     * Params:
     * mat - mat4, first operand
     * mat2 - mat4, second operand
     * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
     *
     * Returns:
     * dest if specified, mat otherwise
     */
    mat4.multiply = function (mat, mat2, dest) {
        if (!dest) { dest = mat; }

        // Cache the matrix values (makes for huge speed increases!)
        var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
            a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
            a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
            a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15],

            b00 = mat2[0], b01 = mat2[1], b02 = mat2[2], b03 = mat2[3],
            b10 = mat2[4], b11 = mat2[5], b12 = mat2[6], b13 = mat2[7],
            b20 = mat2[8], b21 = mat2[9], b22 = mat2[10], b23 = mat2[11],
            b30 = mat2[12], b31 = mat2[13], b32 = mat2[14], b33 = mat2[15];

        dest[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
        dest[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
        dest[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
        dest[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
        dest[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
        dest[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
        dest[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
        dest[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
        dest[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
        dest[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
        dest[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
        dest[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
        dest[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
        dest[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
        dest[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
        dest[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;

        return dest;
    };

    /*
     * mat4.multiplyVec3
     * Transforms a vec3 with the given matrix
     * 4th vector component is implicitly '1'
     *
     * Params:
     * mat - mat4 to transform the vector with
     * vec - vec3 to transform
     * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
     *
     * Returns:
     * dest if specified, vec otherwise
     */
    mat4.multiplyVec3 = function (mat, vec, dest) {
        if (!dest) { dest = vec; }

        var x = vec[0], y = vec[1], z = vec[2];

        dest[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
        dest[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
        dest[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];

        return dest;
    };

    /*
     * mat4.multiplyVec4
     * Transforms a vec4 with the given matrix
     *
     * Params:
     * mat - mat4 to transform the vector with
     * vec - vec4 to transform
     * dest - Optional, vec4 receiving operation result. If not specified result is written to vec
     *
     * Returns:
     * dest if specified, vec otherwise
     */
    mat4.multiplyVec4 = function (mat, vec, dest) {
        if (!dest) { dest = vec; }

        var x = vec[0], y = vec[1], z = vec[2], w = vec[3];

        dest[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12] * w;
        dest[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13] * w;
        dest[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14] * w;
        dest[3] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15] * w;

        return dest;
    };

    /*
     * mat4.translate
     * Translates a matrix by the given vector
     *
     * Params:
     * mat - mat4 to translate
     * vec - vec3 specifying the translation
     * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
     *
     * Returns:
     * dest if specified, mat otherwise
     */
    mat4.translate = function (mat, vec, dest) {
        var x = vec[0], y = vec[1], z = vec[2],
            a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23;

        if (!dest || mat === dest) {
            mat[12] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
            mat[13] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
            mat[14] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];
            mat[15] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
            return mat;
        }

        a00 = mat[0]; a01 = mat[1]; a02 = mat[2]; a03 = mat[3];
        a10 = mat[4]; a11 = mat[5]; a12 = mat[6]; a13 = mat[7];
        a20 = mat[8]; a21 = mat[9]; a22 = mat[10]; a23 = mat[11];

        dest[0] = a00; dest[1] = a01; dest[2] = a02; dest[3] = a03;
        dest[4] = a10; dest[5] = a11; dest[6] = a12; dest[7] = a13;
        dest[8] = a20; dest[9] = a21; dest[10] = a22; dest[11] = a23;

        dest[12] = a00 * x + a10 * y + a20 * z + mat[12];
        dest[13] = a01 * x + a11 * y + a21 * z + mat[13];
        dest[14] = a02 * x + a12 * y + a22 * z + mat[14];
        dest[15] = a03 * x + a13 * y + a23 * z + mat[15];
        return dest;
    };

    /*
     * mat4.scale
     * Scales a matrix by the given vector
     *
     * Params:
     * mat - mat4 to scale
     * vec - vec3 specifying the scale for each axis
     * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
     *
     * Returns:
     * dest if specified, mat otherwise
     */
    mat4.scale = function (mat, vec, dest) {
        var x = vec[0], y = vec[1], z = vec[2];

        if (!dest || mat === dest) {
            mat[0] *= x;
            mat[1] *= x;
            mat[2] *= x;
            mat[3] *= x;
            mat[4] *= y;
            mat[5] *= y;
            mat[6] *= y;
            mat[7] *= y;
            mat[8] *= z;
            mat[9] *= z;
            mat[10] *= z;
            mat[11] *= z;
            return mat;
        }

        dest[0] = mat[0] * x;
        dest[1] = mat[1] * x;
        dest[2] = mat[2] * x;
        dest[3] = mat[3] * x;
        dest[4] = mat[4] * y;
        dest[5] = mat[5] * y;
        dest[6] = mat[6] * y;
        dest[7] = mat[7] * y;
        dest[8] = mat[8] * z;
        dest[9] = mat[9] * z;
        dest[10] = mat[10] * z;
        dest[11] = mat[11] * z;
        dest[12] = mat[12];
        dest[13] = mat[13];
        dest[14] = mat[14];
        dest[15] = mat[15];
        return dest;
    };

    /*
     * mat4.rotate
     * Rotates a matrix by the given angle around the specified axis
     * If rotating around a primary axis (X,Y,Z) one of the specialized rotation functions should be used instead for performance
     *
     * Params:
     * mat - mat4 to rotate
     * angle - angle (in radians) to rotate
     * axis - vec3 representing the axis to rotate around
     * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
     *
     * Returns:
     * dest if specified, mat otherwise
     */
    mat4.rotate = function (mat, angle, axis, dest) {
        var x = axis[0], y = axis[1], z = axis[2],
            len = Math.sqrt(x * x + y * y + z * z),
            s, c, t,
            a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            b00, b01, b02,
            b10, b11, b12,
            b20, b21, b22;

        if (!len) { return null; }
        if (len !== 1) {
            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;
        }

        s = Math.sin(angle);
        c = Math.cos(angle);
        t = 1 - c;

        a00 = mat[0]; a01 = mat[1]; a02 = mat[2]; a03 = mat[3];
        a10 = mat[4]; a11 = mat[5]; a12 = mat[6]; a13 = mat[7];
        a20 = mat[8]; a21 = mat[9]; a22 = mat[10]; a23 = mat[11];

        // Construct the elements of the rotation matrix
        b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
        b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
        b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

        if (!dest) {
            dest = mat;
        } else if (mat !== dest) { // If the source and destination differ, copy the unchanged last row
            dest[12] = mat[12];
            dest[13] = mat[13];
            dest[14] = mat[14];
            dest[15] = mat[15];
        }

        // Perform rotation-specific matrix multiplication
        dest[0] = a00 * b00 + a10 * b01 + a20 * b02;
        dest[1] = a01 * b00 + a11 * b01 + a21 * b02;
        dest[2] = a02 * b00 + a12 * b01 + a22 * b02;
        dest[3] = a03 * b00 + a13 * b01 + a23 * b02;

        dest[4] = a00 * b10 + a10 * b11 + a20 * b12;
        dest[5] = a01 * b10 + a11 * b11 + a21 * b12;
        dest[6] = a02 * b10 + a12 * b11 + a22 * b12;
        dest[7] = a03 * b10 + a13 * b11 + a23 * b12;

        dest[8] = a00 * b20 + a10 * b21 + a20 * b22;
        dest[9] = a01 * b20 + a11 * b21 + a21 * b22;
        dest[10] = a02 * b20 + a12 * b21 + a22 * b22;
        dest[11] = a03 * b20 + a13 * b21 + a23 * b22;
        return dest;
    };

    /*
     * mat4.rotateX
     * Rotates a matrix by the given angle around the X axis
     *
     * Params:
     * mat - mat4 to rotate
     * angle - angle (in radians) to rotate
     * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
     *
     * Returns:
     * dest if specified, mat otherwise
     */
    mat4.rotateX = function (mat, angle, dest) {
        var s = Math.sin(angle),
            c = Math.cos(angle),
            a10 = mat[4],
            a11 = mat[5],
            a12 = mat[6],
            a13 = mat[7],
            a20 = mat[8],
            a21 = mat[9],
            a22 = mat[10],
            a23 = mat[11];

        if (!dest) {
            dest = mat;
        } else if (mat !== dest) { // If the source and destination differ, copy the unchanged rows
            dest[0] = mat[0];
            dest[1] = mat[1];
            dest[2] = mat[2];
            dest[3] = mat[3];

            dest[12] = mat[12];
            dest[13] = mat[13];
            dest[14] = mat[14];
            dest[15] = mat[15];
        }

        // Perform axis-specific matrix multiplication
        dest[4] = a10 * c + a20 * s;
        dest[5] = a11 * c + a21 * s;
        dest[6] = a12 * c + a22 * s;
        dest[7] = a13 * c + a23 * s;

        dest[8] = a10 * -s + a20 * c;
        dest[9] = a11 * -s + a21 * c;
        dest[10] = a12 * -s + a22 * c;
        dest[11] = a13 * -s + a23 * c;
        return dest;
    };

    /*
     * mat4.rotateY
     * Rotates a matrix by the given angle around the Y axis
     *
     * Params:
     * mat - mat4 to rotate
     * angle - angle (in radians) to rotate
     * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
     *
     * Returns:
     * dest if specified, mat otherwise
     */
    mat4.rotateY = function (mat, angle, dest) {
        var s = Math.sin(angle),
            c = Math.cos(angle),
            a00 = mat[0],
            a01 = mat[1],
            a02 = mat[2],
            a03 = mat[3],
            a20 = mat[8],
            a21 = mat[9],
            a22 = mat[10],
            a23 = mat[11];

        if (!dest) {
            dest = mat;
        } else if (mat !== dest) { // If the source and destination differ, copy the unchanged rows
            dest[4] = mat[4];
            dest[5] = mat[5];
            dest[6] = mat[6];
            dest[7] = mat[7];

            dest[12] = mat[12];
            dest[13] = mat[13];
            dest[14] = mat[14];
            dest[15] = mat[15];
        }

        // Perform axis-specific matrix multiplication
        dest[0] = a00 * c + a20 * -s;
        dest[1] = a01 * c + a21 * -s;
        dest[2] = a02 * c + a22 * -s;
        dest[3] = a03 * c + a23 * -s;

        dest[8] = a00 * s + a20 * c;
        dest[9] = a01 * s + a21 * c;
        dest[10] = a02 * s + a22 * c;
        dest[11] = a03 * s + a23 * c;
        return dest;
    };

    /*
     * mat4.rotateZ
     * Rotates a matrix by the given angle around the Z axis
     *
     * Params:
     * mat - mat4 to rotate
     * angle - angle (in radians) to rotate
     * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
     *
     * Returns:
     * dest if specified, mat otherwise
     */
    mat4.rotateZ = function (mat, angle, dest) {
        var s = Math.sin(angle),
            c = Math.cos(angle),
            a00 = mat[0],
            a01 = mat[1],
            a02 = mat[2],
            a03 = mat[3],
            a10 = mat[4],
            a11 = mat[5],
            a12 = mat[6],
            a13 = mat[7];

        if (!dest) {
            dest = mat;
        } else if (mat !== dest) { // If the source and destination differ, copy the unchanged last row
            dest[8] = mat[8];
            dest[9] = mat[9];
            dest[10] = mat[10];
            dest[11] = mat[11];

            dest[12] = mat[12];
            dest[13] = mat[13];
            dest[14] = mat[14];
            dest[15] = mat[15];
        }

        // Perform axis-specific matrix multiplication
        dest[0] = a00 * c + a10 * s;
        dest[1] = a01 * c + a11 * s;
        dest[2] = a02 * c + a12 * s;
        dest[3] = a03 * c + a13 * s;

        dest[4] = a00 * -s + a10 * c;
        dest[5] = a01 * -s + a11 * c;
        dest[6] = a02 * -s + a12 * c;
        dest[7] = a03 * -s + a13 * c;

        return dest;
    };

    /*
     * mat4.frustum
     * Generates a frustum matrix with the given bounds
     *
     * Params:
     * left, right - scalar, left and right bounds of the frustum
     * bottom, top - scalar, bottom and top bounds of the frustum
     * near, far - scalar, near and far bounds of the frustum
     * dest - Optional, mat4 frustum matrix will be written into
     *
     * Returns:
     * dest if specified, a new mat4 otherwise
     */
    mat4.frustum = function (left, right, bottom, top, near, far, dest) {
        if (!dest) { dest = mat4.create(); }
        var rl = (right - left),
            tb = (top - bottom),
            fn = (far - near);
        dest[0] = (near * 2) / rl;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        dest[4] = 0;
        dest[5] = (near * 2) / tb;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = (right + left) / rl;
        dest[9] = (top + bottom) / tb;
        dest[10] = -(far + near) / fn;
        dest[11] = -1;
        dest[12] = 0;
        dest[13] = 0;
        dest[14] = -(far * near * 2) / fn;
        dest[15] = 0;
        return dest;
    };

    /*
     * mat4.perspective
     * Generates a perspective projection matrix with the given bounds
     *
     * Params:
     * fovy - scalar, vertical field of view
     * aspect - scalar, aspect ratio. typically viewport width/height
     * near, far - scalar, near and far bounds of the frustum
     * dest - Optional, mat4 frustum matrix will be written into
     *
     * Returns:
     * dest if specified, a new mat4 otherwise
     */
    mat4.perspective = function (fovy, aspect, near, far, dest) {
        var top = near * Math.tan(fovy * Math.PI / 360.0),
            right = top * aspect;
        return mat4.frustum(-right, right, -top, top, near, far, dest);
    };

    /*
     * mat4.ortho
     * Generates a orthogonal projection matrix with the given bounds
     *
     * Params:
     * left, right - scalar, left and right bounds of the frustum
     * bottom, top - scalar, bottom and top bounds of the frustum
     * near, far - scalar, near and far bounds of the frustum
     * dest - Optional, mat4 frustum matrix will be written into
     *
     * Returns:
     * dest if specified, a new mat4 otherwise
     */
    mat4.ortho = function (left, right, bottom, top, near, far, dest) {
        if (!dest) { dest = mat4.create(); }
        var rl = (right - left),
            tb = (top - bottom),
            fn = (far - near);
        dest[0] = 2 / rl;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        dest[4] = 0;
        dest[5] = 2 / tb;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = 0;
        dest[9] = 0;
        dest[10] = -2 / fn;
        dest[11] = 0;
        dest[12] = -(left + right) / rl;
        dest[13] = -(top + bottom) / tb;
        dest[14] = -(far + near) / fn;
        dest[15] = 1;
        return dest;
    };

    /*
     * mat4.lookAt
     * Generates a look-at matrix with the given eye position, focal point, and up axis
     *
     * Params:
     * eye - vec3, position of the viewer
     * center - vec3, point the viewer is looking at
     * up - vec3 pointing "up"
     * dest - Optional, mat4 frustum matrix will be written into
     *
     * Returns:
     * dest if specified, a new mat4 otherwise
     */
    mat4.lookAt = function (eye, center, up, dest) {
        if (!dest) { dest = mat4.create(); }

        var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
            eyex = eye[0],
            eyey = eye[1],
            eyez = eye[2],
            upx = up[0],
            upy = up[1],
            upz = up[2],
            centerx = center[0],
            centery = center[1],
            centerz = center[2];

        if (eyex === centerx && eyey === centery && eyez === centerz) {
            return mat4.identity(dest);
        }

        //vec3.direction(eye, center, z);
        z0 = eyex - center[0];
        z1 = eyey - center[1];
        z2 = eyez - center[2];

        // normalize (no check needed for 0 because of early return)
        len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;

        //vec3.normalize(vec3.cross(up, z, x));
        x0 = upy * z2 - upz * z1;
        x1 = upz * z0 - upx * z2;
        x2 = upx * z1 - upy * z0;
        len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        if (!len) {
            x0 = 0;
            x1 = 0;
            x2 = 0;
        } else {
            len = 1 / len;
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }

        //vec3.normalize(vec3.cross(z, x, y));
        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;

        len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
        if (!len) {
            y0 = 0;
            y1 = 0;
            y2 = 0;
        } else {
            len = 1 / len;
            y0 *= len;
            y1 *= len;
            y2 *= len;
        }

        dest[0] = x0;
        dest[1] = y0;
        dest[2] = z0;
        dest[3] = 0;
        dest[4] = x1;
        dest[5] = y1;
        dest[6] = z1;
        dest[7] = 0;
        dest[8] = x2;
        dest[9] = y2;
        dest[10] = z2;
        dest[11] = 0;
        dest[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
        dest[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
        dest[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
        dest[15] = 1;

        return dest;
    };

    /*
     * mat4.fromRotationTranslation
     * Creates a matrix from a quaternion rotation and vector translation
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.translate(dest, vec);
     *     var quatMat = mat4.create();
     *     quat4.toMat4(quat, quatMat);
     *     mat4.multiply(dest, quatMat);
     *
     * Params:
     * quat - quat4 specifying the rotation by
     * vec - vec3 specifying the translation
     * dest - Optional, mat4 receiving operation result. If not specified result is written to a new mat4
     *
     * Returns:
     * dest if specified, a new mat4 otherwise
     */
    mat4.fromRotationTranslation = function (quat, vec, dest) {
        if (!dest) { dest = mat4.create(); }

        // Quaternion math
        var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,

            xx = x * x2,
            xy = x * y2,
            xz = x * z2,
            yy = y * y2,
            yz = y * z2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;

        dest[0] = 1 - (yy + zz);
        dest[1] = xy + wz;
        dest[2] = xz - wy;
        dest[3] = 0;
        dest[4] = xy - wz;
        dest[5] = 1 - (xx + zz);
        dest[6] = yz + wx;
        dest[7] = 0;
        dest[8] = xz + wy;
        dest[9] = yz - wx;
        dest[10] = 1 - (xx + yy);
        dest[11] = 0;
        dest[12] = vec[0];
        dest[13] = vec[1];
        dest[14] = vec[2];
        dest[15] = 1;

        return dest;
    };

    /*
     * mat4.str
     * Returns a string representation of a mat4
     *
     * Params:
     * mat - mat4 to represent as a string
     *
     * Returns:
     * string representation of mat
     */
    mat4.str = function (mat) {
        return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] + ', ' + mat[3] +
            ', ' + mat[4] + ', ' + mat[5] + ', ' + mat[6] + ', ' + mat[7] +
            ', ' + mat[8] + ', ' + mat[9] + ', ' + mat[10] + ', ' + mat[11] +
            ', ' + mat[12] + ', ' + mat[13] + ', ' + mat[14] + ', ' + mat[15] + ']';
    };

    /*
     * quat4 - Quaternions
     */

    /*
     * quat4.create
     * Creates a new instance of a quat4 using the default array type
     * Any javascript array containing at least 4 numeric elements can serve as a quat4
     *
     * Params:
     * quat - Optional, quat4 containing values to initialize with
     *
     * Returns:
     * New quat4
     */
    quat4.create = function (quat) {
        var dest = new MatrixArray(4);

        if (quat) {
            dest[0] = quat[0];
            dest[1] = quat[1];
            dest[2] = quat[2];
            dest[3] = quat[3];
        }

        return dest;
    };

    /*
     * quat4.set
     * Copies the values of one quat4 to another
     *
     * Params:
     * quat - quat4 containing values to copy
     * dest - quat4 receiving copied values
     *
     * Returns:
     * dest
     */
    quat4.set = function (quat, dest) {
        dest[0] = quat[0];
        dest[1] = quat[1];
        dest[2] = quat[2];
        dest[3] = quat[3];

        return dest;
    };

    /*
     * quat4.calculateW
     * Calculates the W component of a quat4 from the X, Y, and Z components.
     * Assumes that quaternion is 1 unit in length.
     * Any existing W component will be ignored.
     *
     * Params:
     * quat - quat4 to calculate W component of
     * dest - Optional, quat4 receiving calculated values. If not specified result is written to quat
     *
     * Returns:
     * dest if specified, quat otherwise
     */
    quat4.calculateW = function (quat, dest) {
        var x = quat[0], y = quat[1], z = quat[2];

        if (!dest || quat === dest) {
            quat[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
            return quat;
        }
        dest[0] = x;
        dest[1] = y;
        dest[2] = z;
        dest[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
        return dest;
    };

    /*
     * quat4.inverse
     * Calculates the inverse of a quat4
     *
     * Params:
     * quat - quat4 to calculate inverse of
     * dest - Optional, quat4 receiving inverse values. If not specified result is written to quat
     *
     * Returns:
     * dest if specified, quat otherwise
     */
    quat4.inverse = function (quat, dest) {
        if (!dest || quat === dest) {
            quat[0] *= -1;
            quat[1] *= -1;
            quat[2] *= -1;
            return quat;
        }
        dest[0] = -quat[0];
        dest[1] = -quat[1];
        dest[2] = -quat[2];
        dest[3] = quat[3];
        return dest;
    };

    /*
     * quat4.length
     * Calculates the length of a quat4
     *
     * Params:
     * quat - quat4 to calculate length of
     *
     * Returns:
     * Length of quat
     */
    quat4.length = function (quat) {
        var x = quat[0], y = quat[1], z = quat[2], w = quat[3];
        return Math.sqrt(x * x + y * y + z * z + w * w);
    };

    /*
     * quat4.normalize
     * Generates a unit quaternion of the same direction as the provided quat4
     * If quaternion length is 0, returns [0, 0, 0, 0]
     *
     * Params:
     * quat - quat4 to normalize
     * dest - Optional, quat4 receiving operation result. If not specified result is written to quat
     *
     * Returns:
     * dest if specified, quat otherwise
     */
    quat4.normalize = function (quat, dest) {
        if (!dest) { dest = quat; }

        var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
            len = Math.sqrt(x * x + y * y + z * z + w * w);
        if (len === 0) {
            dest[0] = 0;
            dest[1] = 0;
            dest[2] = 0;
            dest[3] = 0;
            return dest;
        }
        len = 1 / len;
        dest[0] = x * len;
        dest[1] = y * len;
        dest[2] = z * len;
        dest[3] = w * len;

        return dest;
    };

    /*
     * quat4.multiply
     * Performs a quaternion multiplication
     *
     * Params:
     * quat - quat4, first operand
     * quat2 - quat4, second operand
     * dest - Optional, quat4 receiving operation result. If not specified result is written to quat
     *
     * Returns:
     * dest if specified, quat otherwise
     */
    quat4.multiply = function (quat, quat2, dest) {
        if (!dest) { dest = quat; }

        var qax = quat[0], qay = quat[1], qaz = quat[2], qaw = quat[3],
            qbx = quat2[0], qby = quat2[1], qbz = quat2[2], qbw = quat2[3];

        dest[0] = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        dest[1] = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        dest[2] = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        dest[3] = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

        return dest;
    };

    /*
     * quat4.multiplyVec3
     * Transforms a vec3 with the given quaternion
     *
     * Params:
     * quat - quat4 to transform the vector with
     * vec - vec3 to transform
     * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
     *
     * Returns:
     * dest if specified, vec otherwise
     */
    quat4.multiplyVec3 = function (quat, vec, dest) {
        if (!dest) { dest = vec; }

        var x = vec[0], y = vec[1], z = vec[2],
            qx = quat[0], qy = quat[1], qz = quat[2], qw = quat[3],

            // calculate quat * vec
            ix = qw * x + qy * z - qz * y,
            iy = qw * y + qz * x - qx * z,
            iz = qw * z + qx * y - qy * x,
            iw = -qx * x - qy * y - qz * z;

        // calculate result * inverse quat
        dest[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        dest[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        dest[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;

        return dest;
    };

    /*
     * quat4.toMat3
     * Calculates a 3x3 matrix from the given quat4
     *
     * Params:
     * quat - quat4 to create matrix from
     * dest - Optional, mat3 receiving operation result
     *
     * Returns:
     * dest if specified, a new mat3 otherwise
     */
    quat4.toMat3 = function (quat, dest) {
        if (!dest) { dest = mat3.create(); }

        var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,

            xx = x * x2,
            xy = x * y2,
            xz = x * z2,
            yy = y * y2,
            yz = y * z2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;

        dest[0] = 1 - (yy + zz);
        dest[1] = xy + wz;
        dest[2] = xz - wy;

        dest[3] = xy - wz;
        dest[4] = 1 - (xx + zz);
        dest[5] = yz + wx;

        dest[6] = xz + wy;
        dest[7] = yz - wx;
        dest[8] = 1 - (xx + yy);

        return dest;
    };

    /*
     * quat4.toMat4
     * Calculates a 4x4 matrix from the given quat4
     *
     * Params:
     * quat - quat4 to create matrix from
     * dest - Optional, mat4 receiving operation result
     *
     * Returns:
     * dest if specified, a new mat4 otherwise
     */
    quat4.toMat4 = function (quat, dest) {
        if (!dest) { dest = mat4.create(); }

        var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,

            xx = x * x2,
            xy = x * y2,
            xz = x * z2,
            yy = y * y2,
            yz = y * z2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;

        dest[0] = 1 - (yy + zz);
        dest[1] = xy + wz;
        dest[2] = xz - wy;
        dest[3] = 0;

        dest[4] = xy - wz;
        dest[5] = 1 - (xx + zz);
        dest[6] = yz + wx;
        dest[7] = 0;

        dest[8] = xz + wy;
        dest[9] = yz - wx;
        dest[10] = 1 - (xx + yy);
        dest[11] = 0;

        dest[12] = 0;
        dest[13] = 0;
        dest[14] = 0;
        dest[15] = 1;

        return dest;
    };

    /*
     * quat4.slerp
     * Performs a spherical linear interpolation between two quat4
     *
     * Params:
     * quat - quat4, first quaternion
     * quat2 - quat4, second quaternion
     * slerp - interpolation amount between the two inputs
     * dest - Optional, quat4 receiving operation result. If not specified result is written to quat
     *
     * Returns:
     * dest if specified, quat otherwise
     */
    quat4.slerp = function (quat, quat2, slerp, dest) {
        if (!dest) { dest = quat; }

        var cosHalfTheta = quat[0] * quat2[0] + quat[1] * quat2[1] + quat[2] * quat2[2] + quat[3] * quat2[3],
            halfTheta,
            sinHalfTheta,
            ratioA,
            ratioB;

        if (Math.abs(cosHalfTheta) >= 1.0) {
            if (dest !== quat) {
                dest[0] = quat[0];
                dest[1] = quat[1];
                dest[2] = quat[2];
                dest[3] = quat[3];
            }
            return dest;
        }

        halfTheta = Math.acos(cosHalfTheta);
        sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

        if (Math.abs(sinHalfTheta) < 0.001) {
            dest[0] = (quat[0] * 0.5 + quat2[0] * 0.5);
            dest[1] = (quat[1] * 0.5 + quat2[1] * 0.5);
            dest[2] = (quat[2] * 0.5 + quat2[2] * 0.5);
            dest[3] = (quat[3] * 0.5 + quat2[3] * 0.5);
            return dest;
        }

        ratioA = Math.sin((1 - slerp) * halfTheta) / sinHalfTheta;
        ratioB = Math.sin(slerp * halfTheta) / sinHalfTheta;

        dest[0] = (quat[0] * ratioA + quat2[0] * ratioB);
        dest[1] = (quat[1] * ratioA + quat2[1] * ratioB);
        dest[2] = (quat[2] * ratioA + quat2[2] * ratioB);
        dest[3] = (quat[3] * ratioA + quat2[3] * ratioB);

        return dest;
    };

    /*
     * quat4.str
     * Returns a string representation of a quaternion
     *
     * Params:
     * quat - quat4 to represent as a string
     *
     * Returns:
     * string representation of quat
     */
    quat4.str = function (quat) {
        return '[' + quat[0] + ', ' + quat[1] + ', ' + quat[2] + ', ' + quat[3] + ']';
    };
//endregion

// Include libs/glMatrixUtils.js
//region
    // utility for glMatrix
    mat4.createIdentity = function() {
        return mat4.identity(mat4.create());
    };
    mat4.createMultiply = function(a, b) {
        return mat4.multiply(a, b, mat4.create());
    };
    mat4.createInverse = function(mat) {
        return mat4.inverse(mat, mat4.create());
    };
    mat4.inverseTranspose = function(mat, dest) {
        if (!dest || mat == dest) {
            return mat4.transpose(mat4.inverse(mat));
        }
        return mat4.transpose(mat4.inverse(mat, dest));
    };
    mat4.applyScale = function(mat, vec) {
        var scaling = mat4.scale(mat4.identity(mat4.create()), vec);
        return mat4.multiply(scaling, mat, mat);
    };
    mat4.applyTranslate = function(mat, vec) {
        var translation = mat4.translate(mat4.identity(mat4.create()), vec);
        return mat4.multiply(translation, mat, mat);
    };

    vec3.moveBy = vec3.add;
    vec3.createAdd = function(a, b) {
        return vec3.add(a, b, vec3.create());
    };
    vec3.rotateX = function(vec, angle, dest) {
        var rotation = mat4.rotateX(mat4.identity(mat4.create()), angle);
        return mat4.multiplyVec3(rotation, vec, dest);
    };
    vec3.rotateY = function(vec, angle, dest) {
        var rotation = mat4.rotateY(mat4.identity(mat4.create()), angle);
        return mat4.multiplyVec3(rotation, vec, dest);
    };
    vec3.createNormalize = function(vec) {
        return vec3.normalize(vec3.create(vec));
    };
    vec3.lengthBetween = function(a, b) {
        return vec3.length([a[0] - b[0], a[1] - b[1], a[2] - b[2]]);
    };
    vec3.multiplyMat4 = function(vec, mat, dest) {
        return mat4.multiplyVec3(mat, vec, dest);
    };
    vec3.multiplyQuat4 = function(vec, quat, dest) {
        return quat4.multiplyVec3(quat, vec, dest);
    };
    vec3.createSubtract = function(vec, vec2) {
        return vec3.subtract(vec, vec2, vec3.create());
    };
    vec3.createLerp = function(vec, vec2, lerp) {
        return vec3.lerp(vec, vec2, lerp, vec3.create());
    };
    vec3.lerp3 = function(vec, vec2, lerp3, dest) {
        if (!dest) { dest = vec; }
        dest[0] = vec[0] + lerp3[0] * (vec2[0] - vec[0]);
        dest[1] = vec[1] + lerp3[1] * (vec2[1] - vec[1]);
        dest[2] = vec[2] + lerp3[2] * (vec2[2] - vec[2]);
        return dest;
    };
    vec3.createLerp3 = function(vec, vec2, lerp3) {
        return vec3.lerp3(vec, vec2, lerp3, vec3.create());
    };
    vec3.rotateByQuat4 = function(vec, quat, dest) {
        if (!dest) { dest = vec; }
        if (dest[0] === 0 && dest[1] === 0 && dest[2] === 0) return dest;
        quat4.multiplyVec3(quat, vec, dest);
        return vec3.set(dest, quat4.multiply(
            [dest[0], dest[1], dest[2], 0],
            [-quat[0], -quat[1], -quat[2], quat[3]]));
    };

    quat4.createMultiply = function(quat, quat2) {
        return quat4.multiply(quat, quat2, quat4.create());
    };
    quat4.createSlerp = function(quat, quat2, slerp) {
        return quat4.slerp(quat, quat2, slerp, quat4.create());
    };
    quat4.createInverse = function(quat) {
        return quat4.inverse(quat, quat4.create())
    };
    quat4.dot = function(quat, quat2) {
        return quat[0] * quat2[0] + quat[1] * quat2[1] + quat[2] * quat2[2] + quat[3] * quat2[3];
    };
//endregion

// Include libs/sjis.js
//region
    function sjisArrayToString(ary) {
        var res = [];
        for (var i = 0, code; code = ary[i++]; ) {
            if (single_byte.hasOwnProperty(code)) {
                res.push(single_byte[code]);
            } else {
                code = (code << 8) + ary[i++];
                if (double_byte.hasOwnProperty(code)) {
                    res.push(double_byte[code]);
                } else {
                    break;
                }
            }
        }
        return res.join('');
    }
//conversion table was aquired at http://www.din.or.jp/~itoh01/Usage/XJIS_CodeTable.htm
    var single_byte={
        0x20:" ",0x21:"!",0x22:"\"",0x23:"#",0x24:"$",0x25:"%",0x26:"&",0x27:"'",0x28:"(",0x29:")",0x2a:"*",0x2b:"+",0x2c:",",0x2d:"-",0x2e:".",0x2f:"/",0x30:"0",0x31:"1",0x32:"2",0x33:"3",0x34:"4",0x35:"5",0x36:"6",0x37:"7",0x38:"8",0x39:"9",0x3a:":",0x3b:";",0x3c:"<",0x3d:"=",0x3e:">",0x3f:"?",0x40:"@",0x41:"A",0x42:"B",0x43:"C",0x44:"D",0x45:"E",0x46:"F",0x47:"G",0x48:"H",0x49:"I",0x4a:"J",0x4b:"K",0x4c:"L",0x4d:"M",0x4e:"N",0x4f:"O",0x50:"P",0x51:"Q",0x52:"R",0x53:"S",0x54:"T",0x55:"U",0x56:"V",0x57:"W",0x58:"X",0x59:"Y",0x5a:"Z",0x5b:"[",0x5c:"\\",0x5d:"]",0x5e:"^",0x5f:"_",0x60:"`",0x61:"a",0x62:"b",0x63:"c",0x64:"d",0x65:"e",0x66:"f",0x67:"g",0x68:"h",0x69:"i",0x6a:"j",0x6b:"k",0x6c:"l",0x6d:"m",0x6e:"n",0x6f:"o",0x70:"p",0x71:"q",0x72:"r",0x73:"s",0x74:"t",0x75:"u",0x76:"v",0x77:"w",0x78:"x",0x79:"y",0x7a:"z",0x7b:"{",0x7c:"|",0x7d:"}",0x7e:"~",0xa1:"｡",0xa2:"｢",0xa3:"｣",0xa4:"､",0xa5:"･",0xa6:"ｦ",0xa7:"ｧ",0xa8:"ｨ",0xa9:"ｩ",0xaa:"ｪ",0xab:"ｫ",0xac:"ｬ",0xad:"ｭ",0xae:"ｮ",0xaf:"ｯ",0xb0:"ｰ",0xb1:"ｱ",0xb2:"ｲ",0xb3:"ｳ",0xb4:"ｴ",0xb5:"ｵ",0xb6:"ｶ",0xb7:"ｷ",0xb8:"ｸ",0xb9:"ｹ",0xba:"ｺ",0xbb:"ｻ",0xbc:"ｼ",0xbd:"ｽ",0xbe:"ｾ",0xbf:"ｿ",0xc0:"ﾀ",0xc1:"ﾁ",0xc2:"ﾂ",0xc3:"ﾃ",0xc4:"ﾄ",0xc5:"ﾅ",0xc6:"ﾆ",0xc7:"ﾇ",0xc8:"ﾈ",0xc9:"ﾉ",0xca:"ﾊ",0xcb:"ﾋ",0xcc:"ﾌ",0xcd:"ﾍ",0xce:"ﾎ",0xcf:"ﾏ",0xd0:"ﾐ",0xd1:"ﾑ",0xd2:"ﾒ",0xd3:"ﾓ",0xd4:"ﾔ",0xd5:"ﾕ",0xd6:"ﾖ",0xd7:"ﾗ",0xd8:"ﾘ",0xd9:"ﾙ",0xda:"ﾚ",0xdb:"ﾛ",0xdc:"ﾜ",0xdd:"ﾝ",0xde:"ﾞ",0xdf:"ﾟ"};
    var double_byte={
        0x8140:"　",0x8141:"、",0x8142:"。",0x8143:"，",0x8144:"．",0x8145:"・",0x8146:"：",0x8147:"；",0x8148:"？",0x8149:"！",0x814a:"゛",0x814b:"゜",0x814c:"´",0x814d:"｀",0x814e:"¨",0x814f:"＾",0x8150:"￣",0x8151:"＿",0x8152:"ヽ",0x8153:"ヾ",0x8154:"ゝ",0x8155:"ゞ",0x8156:"〃",0x8157:"仝",0x8158:"々",0x8159:"〆",0x815a:"〇",0x815b:"ー",0x815c:"―",0x815d:"‐",0x815e:"／",0x815f:"＼",0x8160:"～",0x8161:"∥",0x8162:"｜",0x8163:"…",0x8164:"‥",0x8165:"‘",0x8166:"’",0x8167:"“",0x8168:"”",0x8169:"（",0x816a:"）",0x816b:"〔",0x816c:"〕",0x816d:"［",0x816e:"］",0x816f:"｛",0x8170:"｝",0x8171:"〈",0x8172:"〉",0x8173:"《",0x8174:"》",0x8175:"「",0x8176:"」",0x8177:"『",0x8178:"』",0x8179:"【",0x817a:"】",0x817b:"＋",0x817c:"－",0x817d:"±",0x817e:"×",0x8180:"÷",0x8181:"＝",0x8182:"≠",0x8183:"＜",0x8184:"＞",0x8185:"≦",0x8186:"≧",0x8187:"∞",0x8188:"∴",0x8189:"♂",0x818a:"♀",0x818b:"°",0x818c:"′",0x818d:"″",0x818e:"℃",0x818f:"￥",0x8190:"＄",0x8191:"￠",0x8192:"￡",0x8193:"％",0x8194:"＃",0x8195:"＆",0x8196:"＊",0x8197:"＠",0x8198:"§",0x8199:"☆",0x819a:"★",0x819b:"○",0x819c:"●",0x819d:"◎",0x819e:"◇",0x819f:"◆",0x81a0:"□",0x81a1:"■",0x81a2:"△",0x81a3:"▲",0x81a4:"▽",0x81a5:"▼",0x81a6:"※",0x81a7:"〒",0x81a8:"→",0x81a9:"←",0x81aa:"↑",0x81ab:"↓",0x81ac:"〓",0x81b8:"∈",0x81b9:"∋",0x81ba:"⊆",0x81bb:"⊇",0x81bc:"⊂",0x81bd:"⊃",0x81be:"∪",0x81bf:"∩",0x81c8:"∧",0x81c9:"∨",0x81ca:"￢",0x81cb:"⇒",0x81cc:"⇔",0x81cd:"∀",0x81ce:"∃",0x81da:"∠",0x81db:"⊥",0x81dc:"⌒",0x81dd:"∂",0x81de:"∇",0x81df:"≡",0x81e0:"≒",0x81e1:"≪",0x81e2:"≫",0x81e3:"√",0x81e4:"∽",0x81e5:"∝",0x81e6:"∵",0x81e7:"∫",0x81e8:"∬",0x81f0:"Å",0x81f1:"‰",0x81f2:"♯",0x81f3:"♭",0x81f4:"♪",0x81f5:"†",0x81f6:"‡",0x81f7:"¶",0x81fc:"◯",0x824f:"０",0x8250:"１",0x8251:"２",0x8252:"３",0x8253:"４",0x8254:"５",0x8255:"６",0x8256:"７",0x8257:"８",0x8258:"９",0x8260:"Ａ",0x8261:"Ｂ",0x8262:"Ｃ",0x8263:"Ｄ",0x8264:"Ｅ",0x8265:"Ｆ",0x8266:"Ｇ",0x8267:"Ｈ",0x8268:"Ｉ",0x8269:"Ｊ",0x826a:"Ｋ",0x826b:"Ｌ",0x826c:"Ｍ",0x826d:"Ｎ",0x826e:"Ｏ",0x826f:"Ｐ",0x8270:"Ｑ",0x8271:"Ｒ",0x8272:"Ｓ",0x8273:"Ｔ",0x8274:"Ｕ",0x8275:"Ｖ",0x8276:"Ｗ",0x8277:"Ｘ",0x8278:"Ｙ",0x8279:"Ｚ",0x8281:"ａ",0x8282:"ｂ",0x8283:"ｃ",0x8284:"ｄ",0x8285:"ｅ",0x8286:"ｆ",0x8287:"ｇ",0x8288:"ｈ",0x8289:"ｉ",0x828a:"ｊ",0x828b:"ｋ",0x828c:"ｌ",0x828d:"ｍ",0x828e:"ｎ",0x828f:"ｏ",0x8290:"ｐ",0x8291:"ｑ",0x8292:"ｒ",0x8293:"ｓ",0x8294:"ｔ",0x8295:"ｕ",0x8296:"ｖ",0x8297:"ｗ",0x8298:"ｘ",0x8299:"ｙ",0x829a:"ｚ",0x829f:"ぁ",0x82a0:"あ",0x82a1:"ぃ",0x82a2:"い",0x82a3:"ぅ",0x82a4:"う",0x82a5:"ぇ",0x82a6:"え",0x82a7:"ぉ",0x82a8:"お",0x82a9:"か",0x82aa:"が",0x82ab:"き",0x82ac:"ぎ",0x82ad:"く",0x82ae:"ぐ",0x82af:"け",0x82b0:"げ",0x82b1:"こ",0x82b2:"ご",0x82b3:"さ",0x82b4:"ざ",0x82b5:"し",0x82b6:"じ",0x82b7:"す",0x82b8:"ず",0x82b9:"せ",0x82ba:"ぜ",0x82bb:"そ",0x82bc:"ぞ",0x82bd:"た",0x82be:"だ",0x82bf:"ち",0x82c0:"ぢ",0x82c1:"っ",0x82c2:"つ",0x82c3:"づ",0x82c4:"て",0x82c5:"で",0x82c6:"と",0x82c7:"ど",0x82c8:"な",0x82c9:"に",0x82ca:"ぬ",0x82cb:"ね",0x82cc:"の",0x82cd:"は",0x82ce:"ば",0x82cf:"ぱ",0x82d0:"ひ",0x82d1:"び",0x82d2:"ぴ",0x82d3:"ふ",0x82d4:"ぶ",0x82d5:"ぷ",0x82d6:"へ",0x82d7:"べ",0x82d8:"ぺ",0x82d9:"ほ",0x82da:"ぼ",0x82db:"ぽ",0x82dc:"ま",0x82dd:"み",0x82de:"む",0x82df:"め",0x82e0:"も",0x82e1:"ゃ",0x82e2:"や",0x82e3:"ゅ",0x82e4:"ゆ",0x82e5:"ょ",0x82e6:"よ",0x82e7:"ら",0x82e8:"り",0x82e9:"る",0x82ea:"れ",0x82eb:"ろ",0x82ec:"ゎ",0x82ed:"わ",0x82ee:"ゐ",0x82ef:"ゑ",0x82f0:"を",0x82f1:"ん",0x8340:"ァ",0x8341:"ア",0x8342:"ィ",0x8343:"イ",0x8344:"ゥ",0x8345:"ウ",0x8346:"ェ",0x8347:"エ",0x8348:"ォ",0x8349:"オ",0x834a:"カ",0x834b:"ガ",0x834c:"キ",0x834d:"ギ",0x834e:"ク",0x834f:"グ",0x8350:"ケ",0x8351:"ゲ",0x8352:"コ",0x8353:"ゴ",0x8354:"サ",0x8355:"ザ",0x8356:"シ",0x8357:"ジ",0x8358:"ス",0x8359:"ズ",0x835a:"セ",0x835b:"ゼ",0x835c:"ソ",0x835d:"ゾ",0x835e:"タ",0x835f:"ダ",0x8360:"チ",0x8361:"ヂ",0x8362:"ッ",0x8363:"ツ",0x8364:"ヅ",0x8365:"テ",0x8366:"デ",0x8367:"ト",0x8368:"ド",0x8369:"ナ",0x836a:"ニ",0x836b:"ヌ",0x836c:"ネ",0x836d:"ノ",0x836e:"ハ",0x836f:"バ",0x8370:"パ",0x8371:"ヒ",0x8372:"ビ",0x8373:"ピ",0x8374:"フ",0x8375:"ブ",0x8376:"プ",0x8377:"ヘ",0x8378:"ベ",0x8379:"ペ",0x837a:"ホ",0x837b:"ボ",0x837c:"ポ",0x837d:"マ",0x837e:"ミ",0x8380:"ム",0x8381:"メ",0x8382:"モ",0x8383:"ャ",0x8384:"ヤ",0x8385:"ュ",0x8386:"ユ",0x8387:"ョ",0x8388:"ヨ",0x8389:"ラ",0x838a:"リ",0x838b:"ル",0x838c:"レ",0x838d:"ロ",0x838e:"ヮ",0x838f:"ワ",0x8390:"ヰ",0x8391:"ヱ",0x8392:"ヲ",0x8393:"ン",0x8394:"ヴ",0x8395:"ヵ",0x8396:"ヶ",0x839f:"Α",0x83a0:"Β",0x83a1:"Γ",0x83a2:"Δ",0x83a3:"Ε",0x83a4:"Ζ",0x83a5:"Η",0x83a6:"Θ",0x83a7:"Ι",0x83a8:"Κ",0x83a9:"Λ",0x83aa:"Μ",0x83ab:"Ν",0x83ac:"Ξ",0x83ad:"Ο",0x83ae:"Π",0x83af:"Ρ",0x83b0:"Σ",0x83b1:"Τ",0x83b2:"Υ",0x83b3:"Φ",0x83b4:"Χ",0x83b5:"Ψ",0x83b6:"Ω",0x83bf:"α",0x83c0:"β",0x83c1:"γ",0x83c2:"δ",0x83c3:"ε",0x83c4:"ζ",0x83c5:"η",0x83c6:"θ",0x83c7:"ι",0x83c8:"κ",0x83c9:"λ",0x83ca:"μ",0x83cb:"ν",0x83cc:"ξ",0x83cd:"ο",0x83ce:"π",0x83cf:"ρ",0x83d0:"σ",0x83d1:"τ",0x83d2:"υ",0x83d3:"φ",0x83d4:"χ",0x83d5:"ψ",0x83d6:"ω",0x8440:"А",0x8441:"Б",0x8442:"В",0x8443:"Г",0x8444:"Д",0x8445:"Е",0x8446:"Ё",0x8447:"Ж",0x8448:"З",0x8449:"И",0x844a:"Й",0x844b:"К",0x844c:"Л",0x844d:"М",0x844e:"Н",0x844f:"О",0x8450:"П",0x8451:"Р",0x8452:"С",0x8453:"Т",0x8454:"У",0x8455:"Ф",0x8456:"Х",0x8457:"Ц",0x8458:"Ч",0x8459:"Ш",0x845a:"Щ",0x845b:"Ъ",0x845c:"Ы",0x845d:"Ь",0x845e:"Э",0x845f:"Ю",0x8460:"Я",0x8470:"а",0x8471:"б",0x8472:"в",0x8473:"г",0x8474:"д",0x8475:"е",0x8476:"ё",0x8477:"ж",0x8478:"з",0x8479:"и",0x847a:"й",0x847b:"к",0x847c:"л",0x847d:"м",0x847e:"н",0x8480:"о",0x8481:"п",0x8482:"р",0x8483:"с",0x8484:"т",0x8485:"у",0x8486:"ф",0x8487:"х",0x8488:"ц",0x8489:"ч",0x848a:"ш",0x848b:"щ",0x848c:"ъ",0x848d:"ы",0x848e:"ь",0x848f:"э",0x8490:"ю",0x8491:"я",0x849f:"─",0x84a0:"│",0x84a1:"┌",0x84a2:"┐",0x84a3:"┘",0x84a4:"└",0x84a5:"├",0x84a6:"┬",0x84a7:"┤",0x84a8:"┴",0x84a9:"┼",0x84aa:"━",0x84ab:"┃",0x84ac:"┏",0x84ad:"┓",0x84ae:"┛",0x84af:"┗",0x84b0:"┣",0x84b1:"┳",0x84b2:"┫",0x84b3:"┻",0x84b4:"╋",0x84b5:"┠",0x84b6:"┯",0x84b7:"┨",0x84b8:"┷",0x84b9:"┿",0x84ba:"┝",0x84bb:"┰",0x84bc:"┥",0x84bd:"┸",0x84be:"╂",0x8740:"①",0x8741:"②",0x8742:"③",0x8743:"④",0x8744:"⑤",0x8745:"⑥",0x8746:"⑦",0x8747:"⑧",0x8748:"⑨",0x8749:"⑩",0x874a:"⑪",0x874b:"⑫",0x874c:"⑬",0x874d:"⑭",0x874e:"⑮",0x874f:"⑯",0x8750:"⑰",0x8751:"⑱",0x8752:"⑲",0x8753:"⑳",0x8754:"Ⅰ",0x8755:"Ⅱ",0x8756:"Ⅲ",0x8757:"Ⅳ",0x8758:"Ⅴ",0x8759:"Ⅵ",0x875a:"Ⅶ",0x875b:"Ⅷ",0x875c:"Ⅸ",0x875d:"Ⅹ",0x875f:"㍉",0x8760:"㌔",0x8761:"㌢",0x8762:"㍍",0x8763:"㌘",0x8764:"㌧",0x8765:"㌃",0x8766:"㌶",0x8767:"㍑",0x8768:"㍗",0x8769:"㌍",0x876a:"㌦",0x876b:"㌣",0x876c:"㌫",0x876d:"㍊",0x876e:"㌻",0x876f:"㎜",0x8770:"㎝",0x8771:"㎞",0x8772:"㎎",0x8773:"㎏",0x8774:"㏄",0x8775:"㎡",0x877e:"㍻",0x8780:"〝",0x8781:"〟",0x8782:"№",0x8783:"㏍",0x8784:"℡",0x8785:"㊤",0x8786:"㊥",0x8787:"㊦",0x8788:"㊧",0x8789:"㊨",0x878a:"㈱",0x878b:"㈲",0x878c:"㈹",0x878d:"㍾",0x878e:"㍽",0x878f:"㍼",0x8790:"≒",0x8791:"≡",0x8792:"∫",0x8793:"∮",0x8794:"∑",0x8795:"√",0x8796:"⊥",0x8797:"∠",0x8798:"∟",0x8799:"⊿",0x879a:"∵",0x879b:"∩",0x879c:"∪",0x889f:"亜",0x88a0:"唖",0x88a1:"娃",0x88a2:"阿",0x88a3:"哀",0x88a4:"愛",0x88a5:"挨",0x88a6:"姶",0x88a7:"逢",0x88a8:"葵",0x88a9:"茜",0x88aa:"穐",0x88ab:"悪",0x88ac:"握",0x88ad:"渥",0x88ae:"旭",0x88af:"葦",0x88b0:"芦",0x88b1:"鯵",0x88b2:"梓",0x88b3:"圧",0x88b4:"斡",0x88b5:"扱",0x88b6:"宛",0x88b7:"姐",0x88b8:"虻",0x88b9:"飴",0x88ba:"絢",0x88bb:"綾",0x88bc:"鮎",0x88bd:"或",0x88be:"粟",0x88bf:"袷",0x88c0:"安",0x88c1:"庵",0x88c2:"按",0x88c3:"暗",0x88c4:"案",0x88c5:"闇",0x88c6:"鞍",0x88c7:"杏",0x88c8:"以",0x88c9:"伊",0x88ca:"位",0x88cb:"依",0x88cc:"偉",0x88cd:"囲",0x88ce:"夷",0x88cf:"委",0x88d0:"威",0x88d1:"尉",0x88d2:"惟",0x88d3:"意",0x88d4:"慰",0x88d5:"易",0x88d6:"椅",0x88d7:"為",0x88d8:"畏",0x88d9:"異",0x88da:"移",0x88db:"維",0x88dc:"緯",0x88dd:"胃",0x88de:"萎",0x88df:"衣",0x88e0:"謂",0x88e1:"違",0x88e2:"遺",0x88e3:"医",0x88e4:"井",0x88e5:"亥",0x88e6:"域",0x88e7:"育",0x88e8:"郁",0x88e9:"磯",0x88ea:"一",0x88eb:"壱",0x88ec:"溢",0x88ed:"逸",0x88ee:"稲",0x88ef:"茨",0x88f0:"芋",0x88f1:"鰯",0x88f2:"允",0x88f3:"印",0x88f4:"咽",0x88f5:"員",0x88f6:"因",0x88f7:"姻",0x88f8:"引",0x88f9:"飲",0x88fa:"淫",0x88fb:"胤",0x88fc:"蔭",0x8940:"院",0x8941:"陰",0x8942:"隠",0x8943:"韻",0x8944:"吋",0x8945:"右",0x8946:"宇",0x8947:"烏",0x8948:"羽",0x8949:"迂",0x894a:"雨",0x894b:"卯",0x894c:"鵜",0x894d:"窺",0x894e:"丑",0x894f:"碓",0x8950:"臼",0x8951:"渦",0x8952:"嘘",0x8953:"唄",0x8954:"欝",0x8955:"蔚",0x8956:"鰻",0x8957:"姥",0x8958:"厩",0x8959:"浦",0x895a:"瓜",0x895b:"閏",0x895c:"噂",0x895d:"云",0x895e:"運",0x895f:"雲",0x8960:"荏",0x8961:"餌",0x8962:"叡",0x8963:"営",0x8964:"嬰",0x8965:"影",0x8966:"映",0x8967:"曳",0x8968:"栄",0x8969:"永",0x896a:"泳",0x896b:"洩",0x896c:"瑛",0x896d:"盈",0x896e:"穎",0x896f:"頴",0x8970:"英",0x8971:"衛",0x8972:"詠",0x8973:"鋭",0x8974:"液",0x8975:"疫",0x8976:"益",0x8977:"駅",0x8978:"悦",0x8979:"謁",0x897a:"越",0x897b:"閲",0x897c:"榎",0x897d:"厭",0x897e:"円",0x8980:"園",0x8981:"堰",0x8982:"奄",0x8983:"宴",0x8984:"延",0x8985:"怨",0x8986:"掩",0x8987:"援",0x8988:"沿",0x8989:"演",0x898a:"炎",0x898b:"焔",0x898c:"煙",0x898d:"燕",0x898e:"猿",0x898f:"縁",0x8990:"艶",0x8991:"苑",0x8992:"薗",0x8993:"遠",0x8994:"鉛",0x8995:"鴛",0x8996:"塩",0x8997:"於",0x8998:"汚",0x8999:"甥",0x899a:"凹",0x899b:"央",0x899c:"奥",0x899d:"往",0x899e:"応",0x899f:"押",0x89a0:"旺",0x89a1:"横",0x89a2:"欧",0x89a3:"殴",0x89a4:"王",0x89a5:"翁",0x89a6:"襖",0x89a7:"鴬",0x89a8:"鴎",0x89a9:"黄",0x89aa:"岡",0x89ab:"沖",0x89ac:"荻",0x89ad:"億",0x89ae:"屋",0x89af:"憶",0x89b0:"臆",0x89b1:"桶",0x89b2:"牡",0x89b3:"乙",0x89b4:"俺",0x89b5:"卸",0x89b6:"恩",0x89b7:"温",0x89b8:"穏",0x89b9:"音",0x89ba:"下",0x89bb:"化",0x89bc:"仮",0x89bd:"何",0x89be:"伽",0x89bf:"価",0x89c0:"佳",0x89c1:"加",0x89c2:"可",0x89c3:"嘉",0x89c4:"夏",0x89c5:"嫁",0x89c6:"家",0x89c7:"寡",0x89c8:"科",0x89c9:"暇",0x89ca:"果",0x89cb:"架",0x89cc:"歌",0x89cd:"河",0x89ce:"火",0x89cf:"珂",0x89d0:"禍",0x89d1:"禾",0x89d2:"稼",0x89d3:"箇",0x89d4:"花",0x89d5:"苛",0x89d6:"茄",0x89d7:"荷",0x89d8:"華",0x89d9:"菓",0x89da:"蝦",0x89db:"課",0x89dc:"嘩",0x89dd:"貨",0x89de:"迦",0x89df:"過",0x89e0:"霞",0x89e1:"蚊",0x89e2:"俄",0x89e3:"峨",0x89e4:"我",0x89e5:"牙",0x89e6:"画",0x89e7:"臥",0x89e8:"芽",0x89e9:"蛾",0x89ea:"賀",0x89eb:"雅",0x89ec:"餓",0x89ed:"駕",0x89ee:"介",0x89ef:"会",0x89f0:"解",0x89f1:"回",0x89f2:"塊",0x89f3:"壊",0x89f4:"廻",0x89f5:"快",0x89f6:"怪",0x89f7:"悔",0x89f8:"恢",0x89f9:"懐",0x89fa:"戒",0x89fb:"拐",0x89fc:"改",0x8a40:"魁",0x8a41:"晦",0x8a42:"械",0x8a43:"海",0x8a44:"灰",0x8a45:"界",0x8a46:"皆",0x8a47:"絵",0x8a48:"芥",0x8a49:"蟹",0x8a4a:"開",0x8a4b:"階",0x8a4c:"貝",0x8a4d:"凱",0x8a4e:"劾",0x8a4f:"外",0x8a50:"咳",0x8a51:"害",0x8a52:"崖",0x8a53:"慨",0x8a54:"概",0x8a55:"涯",0x8a56:"碍",0x8a57:"蓋",0x8a58:"街",0x8a59:"該",0x8a5a:"鎧",0x8a5b:"骸",0x8a5c:"浬",0x8a5d:"馨",0x8a5e:"蛙",0x8a5f:"垣",0x8a60:"柿",0x8a61:"蛎",0x8a62:"鈎",0x8a63:"劃",0x8a64:"嚇",0x8a65:"各",0x8a66:"廓",0x8a67:"拡",0x8a68:"撹",0x8a69:"格",0x8a6a:"核",0x8a6b:"殻",0x8a6c:"獲",0x8a6d:"確",0x8a6e:"穫",0x8a6f:"覚",0x8a70:"角",0x8a71:"赫",0x8a72:"較",0x8a73:"郭",0x8a74:"閣",0x8a75:"隔",0x8a76:"革",0x8a77:"学",0x8a78:"岳",0x8a79:"楽",0x8a7a:"額",0x8a7b:"顎",0x8a7c:"掛",0x8a7d:"笠",0x8a7e:"樫",0x8a80:"橿",0x8a81:"梶",0x8a82:"鰍",0x8a83:"潟",0x8a84:"割",0x8a85:"喝",0x8a86:"恰",0x8a87:"括",0x8a88:"活",0x8a89:"渇",0x8a8a:"滑",0x8a8b:"葛",0x8a8c:"褐",0x8a8d:"轄",0x8a8e:"且",0x8a8f:"鰹",0x8a90:"叶",0x8a91:"椛",0x8a92:"樺",0x8a93:"鞄",0x8a94:"株",0x8a95:"兜",0x8a96:"竃",0x8a97:"蒲",0x8a98:"釜",0x8a99:"鎌",0x8a9a:"噛",0x8a9b:"鴨",0x8a9c:"栢",0x8a9d:"茅",0x8a9e:"萱",0x8a9f:"粥",0x8aa0:"刈",0x8aa1:"苅",0x8aa2:"瓦",0x8aa3:"乾",0x8aa4:"侃",0x8aa5:"冠",0x8aa6:"寒",0x8aa7:"刊",0x8aa8:"勘",0x8aa9:"勧",0x8aaa:"巻",0x8aab:"喚",0x8aac:"堪",0x8aad:"姦",0x8aae:"完",0x8aaf:"官",0x8ab0:"寛",0x8ab1:"干",0x8ab2:"幹",0x8ab3:"患",0x8ab4:"感",0x8ab5:"慣",0x8ab6:"憾",0x8ab7:"換",0x8ab8:"敢",0x8ab9:"柑",0x8aba:"桓",0x8abb:"棺",0x8abc:"款",0x8abd:"歓",0x8abe:"汗",0x8abf:"漢",0x8ac0:"澗",0x8ac1:"潅",0x8ac2:"環",0x8ac3:"甘",0x8ac4:"監",0x8ac5:"看",0x8ac6:"竿",0x8ac7:"管",0x8ac8:"簡",0x8ac9:"緩",0x8aca:"缶",0x8acb:"翰",0x8acc:"肝",0x8acd:"艦",0x8ace:"莞",0x8acf:"観",0x8ad0:"諌",0x8ad1:"貫",0x8ad2:"還",0x8ad3:"鑑",0x8ad4:"間",0x8ad5:"閑",0x8ad6:"関",0x8ad7:"陥",0x8ad8:"韓",0x8ad9:"館",0x8ada:"舘",0x8adb:"丸",0x8adc:"含",0x8add:"岸",0x8ade:"巌",0x8adf:"玩",0x8ae0:"癌",0x8ae1:"眼",0x8ae2:"岩",0x8ae3:"翫",0x8ae4:"贋",0x8ae5:"雁",0x8ae6:"頑",0x8ae7:"顔",0x8ae8:"願",0x8ae9:"企",0x8aea:"伎",0x8aeb:"危",0x8aec:"喜",0x8aed:"器",0x8aee:"基",0x8aef:"奇",0x8af0:"嬉",0x8af1:"寄",0x8af2:"岐",0x8af3:"希",0x8af4:"幾",0x8af5:"忌",0x8af6:"揮",0x8af7:"机",0x8af8:"旗",0x8af9:"既",0x8afa:"期",0x8afb:"棋",0x8afc:"棄",0x8b40:"機",0x8b41:"帰",0x8b42:"毅",0x8b43:"気",0x8b44:"汽",0x8b45:"畿",0x8b46:"祈",0x8b47:"季",0x8b48:"稀",0x8b49:"紀",0x8b4a:"徽",0x8b4b:"規",0x8b4c:"記",0x8b4d:"貴",0x8b4e:"起",0x8b4f:"軌",0x8b50:"輝",0x8b51:"飢",0x8b52:"騎",0x8b53:"鬼",0x8b54:"亀",0x8b55:"偽",0x8b56:"儀",0x8b57:"妓",0x8b58:"宜",0x8b59:"戯",0x8b5a:"技",0x8b5b:"擬",0x8b5c:"欺",0x8b5d:"犠",0x8b5e:"疑",0x8b5f:"祇",0x8b60:"義",0x8b61:"蟻",0x8b62:"誼",0x8b63:"議",0x8b64:"掬",0x8b65:"菊",0x8b66:"鞠",0x8b67:"吉",0x8b68:"吃",0x8b69:"喫",0x8b6a:"桔",0x8b6b:"橘",0x8b6c:"詰",0x8b6d:"砧",0x8b6e:"杵",0x8b6f:"黍",0x8b70:"却",0x8b71:"客",0x8b72:"脚",0x8b73:"虐",0x8b74:"逆",0x8b75:"丘",0x8b76:"久",0x8b77:"仇",0x8b78:"休",0x8b79:"及",0x8b7a:"吸",0x8b7b:"宮",0x8b7c:"弓",0x8b7d:"急",0x8b7e:"救",0x8b80:"朽",0x8b81:"求",0x8b82:"汲",0x8b83:"泣",0x8b84:"灸",0x8b85:"球",0x8b86:"究",0x8b87:"窮",0x8b88:"笈",0x8b89:"級",0x8b8a:"糾",0x8b8b:"給",0x8b8c:"旧",0x8b8d:"牛",0x8b8e:"去",0x8b8f:"居",0x8b90:"巨",0x8b91:"拒",0x8b92:"拠",0x8b93:"挙",0x8b94:"渠",0x8b95:"虚",0x8b96:"許",0x8b97:"距",0x8b98:"鋸",0x8b99:"漁",0x8b9a:"禦",0x8b9b:"魚",0x8b9c:"亨",0x8b9d:"享",0x8b9e:"京",0x8b9f:"供",0x8ba0:"侠",0x8ba1:"僑",0x8ba2:"兇",0x8ba3:"競",0x8ba4:"共",0x8ba5:"凶",0x8ba6:"協",0x8ba7:"匡",0x8ba8:"卿",0x8ba9:"叫",0x8baa:"喬",0x8bab:"境",0x8bac:"峡",0x8bad:"強",0x8bae:"彊",0x8baf:"怯",0x8bb0:"恐",0x8bb1:"恭",0x8bb2:"挟",0x8bb3:"教",0x8bb4:"橋",0x8bb5:"況",0x8bb6:"狂",0x8bb7:"狭",0x8bb8:"矯",0x8bb9:"胸",0x8bba:"脅",0x8bbb:"興",0x8bbc:"蕎",0x8bbd:"郷",0x8bbe:"鏡",0x8bbf:"響",0x8bc0:"饗",0x8bc1:"驚",0x8bc2:"仰",0x8bc3:"凝",0x8bc4:"尭",0x8bc5:"暁",0x8bc6:"業",0x8bc7:"局",0x8bc8:"曲",0x8bc9:"極",0x8bca:"玉",0x8bcb:"桐",0x8bcc:"粁",0x8bcd:"僅",0x8bce:"勤",0x8bcf:"均",0x8bd0:"巾",0x8bd1:"錦",0x8bd2:"斤",0x8bd3:"欣",0x8bd4:"欽",0x8bd5:"琴",0x8bd6:"禁",0x8bd7:"禽",0x8bd8:"筋",0x8bd9:"緊",0x8bda:"芹",0x8bdb:"菌",0x8bdc:"衿",0x8bdd:"襟",0x8bde:"謹",0x8bdf:"近",0x8be0:"金",0x8be1:"吟",0x8be2:"銀",0x8be3:"九",0x8be4:"倶",0x8be5:"句",0x8be6:"区",0x8be7:"狗",0x8be8:"玖",0x8be9:"矩",0x8bea:"苦",0x8beb:"躯",0x8bec:"駆",0x8bed:"駈",0x8bee:"駒",0x8bef:"具",0x8bf0:"愚",0x8bf1:"虞",0x8bf2:"喰",0x8bf3:"空",0x8bf4:"偶",0x8bf5:"寓",0x8bf6:"遇",0x8bf7:"隅",0x8bf8:"串",0x8bf9:"櫛",0x8bfa:"釧",0x8bfb:"屑",0x8bfc:"屈",0x8c40:"掘",0x8c41:"窟",0x8c42:"沓",0x8c43:"靴",0x8c44:"轡",0x8c45:"窪",0x8c46:"熊",0x8c47:"隈",0x8c48:"粂",0x8c49:"栗",0x8c4a:"繰",0x8c4b:"桑",0x8c4c:"鍬",0x8c4d:"勲",0x8c4e:"君",0x8c4f:"薫",0x8c50:"訓",0x8c51:"群",0x8c52:"軍",0x8c53:"郡",0x8c54:"卦",0x8c55:"袈",0x8c56:"祁",0x8c57:"係",0x8c58:"傾",0x8c59:"刑",0x8c5a:"兄",0x8c5b:"啓",0x8c5c:"圭",0x8c5d:"珪",0x8c5e:"型",0x8c5f:"契",0x8c60:"形",0x8c61:"径",0x8c62:"恵",0x8c63:"慶",0x8c64:"慧",0x8c65:"憩",0x8c66:"掲",0x8c67:"携",0x8c68:"敬",0x8c69:"景",0x8c6a:"桂",0x8c6b:"渓",0x8c6c:"畦",0x8c6d:"稽",0x8c6e:"系",0x8c6f:"経",0x8c70:"継",0x8c71:"繋",0x8c72:"罫",0x8c73:"茎",0x8c74:"荊",0x8c75:"蛍",0x8c76:"計",0x8c77:"詣",0x8c78:"警",0x8c79:"軽",0x8c7a:"頚",0x8c7b:"鶏",0x8c7c:"芸",0x8c7d:"迎",0x8c7e:"鯨",0x8c80:"劇",0x8c81:"戟",0x8c82:"撃",0x8c83:"激",0x8c84:"隙",0x8c85:"桁",0x8c86:"傑",0x8c87:"欠",0x8c88:"決",0x8c89:"潔",0x8c8a:"穴",0x8c8b:"結",0x8c8c:"血",0x8c8d:"訣",0x8c8e:"月",0x8c8f:"件",0x8c90:"倹",0x8c91:"倦",0x8c92:"健",0x8c93:"兼",0x8c94:"券",0x8c95:"剣",0x8c96:"喧",0x8c97:"圏",0x8c98:"堅",0x8c99:"嫌",0x8c9a:"建",0x8c9b:"憲",0x8c9c:"懸",0x8c9d:"拳",0x8c9e:"捲",0x8c9f:"検",0x8ca0:"権",0x8ca1:"牽",0x8ca2:"犬",0x8ca3:"献",0x8ca4:"研",0x8ca5:"硯",0x8ca6:"絹",0x8ca7:"県",0x8ca8:"肩",0x8ca9:"見",0x8caa:"謙",0x8cab:"賢",0x8cac:"軒",0x8cad:"遣",0x8cae:"鍵",0x8caf:"険",0x8cb0:"顕",0x8cb1:"験",0x8cb2:"鹸",0x8cb3:"元",0x8cb4:"原",0x8cb5:"厳",0x8cb6:"幻",0x8cb7:"弦",0x8cb8:"減",0x8cb9:"源",0x8cba:"玄",0x8cbb:"現",0x8cbc:"絃",0x8cbd:"舷",0x8cbe:"言",0x8cbf:"諺",0x8cc0:"限",0x8cc1:"乎",0x8cc2:"個",0x8cc3:"古",0x8cc4:"呼",0x8cc5:"固",0x8cc6:"姑",0x8cc7:"孤",0x8cc8:"己",0x8cc9:"庫",0x8cca:"弧",0x8ccb:"戸",0x8ccc:"故",0x8ccd:"枯",0x8cce:"湖",0x8ccf:"狐",0x8cd0:"糊",0x8cd1:"袴",0x8cd2:"股",0x8cd3:"胡",0x8cd4:"菰",0x8cd5:"虎",0x8cd6:"誇",0x8cd7:"跨",0x8cd8:"鈷",0x8cd9:"雇",0x8cda:"顧",0x8cdb:"鼓",0x8cdc:"五",0x8cdd:"互",0x8cde:"伍",0x8cdf:"午",0x8ce0:"呉",0x8ce1:"吾",0x8ce2:"娯",0x8ce3:"後",0x8ce4:"御",0x8ce5:"悟",0x8ce6:"梧",0x8ce7:"檎",0x8ce8:"瑚",0x8ce9:"碁",0x8cea:"語",0x8ceb:"誤",0x8cec:"護",0x8ced:"醐",0x8cee:"乞",0x8cef:"鯉",0x8cf0:"交",0x8cf1:"佼",0x8cf2:"侯",0x8cf3:"候",0x8cf4:"倖",0x8cf5:"光",0x8cf6:"公",0x8cf7:"功",0x8cf8:"効",0x8cf9:"勾",0x8cfa:"厚",0x8cfb:"口",0x8cfc:"向",0x8d40:"后",0x8d41:"喉",0x8d42:"坑",0x8d43:"垢",0x8d44:"好",0x8d45:"孔",0x8d46:"孝",0x8d47:"宏",0x8d48:"工",0x8d49:"巧",0x8d4a:"巷",0x8d4b:"幸",0x8d4c:"広",0x8d4d:"庚",0x8d4e:"康",0x8d4f:"弘",0x8d50:"恒",0x8d51:"慌",0x8d52:"抗",0x8d53:"拘",0x8d54:"控",0x8d55:"攻",0x8d56:"昂",0x8d57:"晃",0x8d58:"更",0x8d59:"杭",0x8d5a:"校",0x8d5b:"梗",0x8d5c:"構",0x8d5d:"江",0x8d5e:"洪",0x8d5f:"浩",0x8d60:"港",0x8d61:"溝",0x8d62:"甲",0x8d63:"皇",0x8d64:"硬",0x8d65:"稿",0x8d66:"糠",0x8d67:"紅",0x8d68:"紘",0x8d69:"絞",0x8d6a:"綱",0x8d6b:"耕",0x8d6c:"考",0x8d6d:"肯",0x8d6e:"肱",0x8d6f:"腔",0x8d70:"膏",0x8d71:"航",0x8d72:"荒",0x8d73:"行",0x8d74:"衡",0x8d75:"講",0x8d76:"貢",0x8d77:"購",0x8d78:"郊",0x8d79:"酵",0x8d7a:"鉱",0x8d7b:"砿",0x8d7c:"鋼",0x8d7d:"閤",0x8d7e:"降",0x8d80:"項",0x8d81:"香",0x8d82:"高",0x8d83:"鴻",0x8d84:"剛",0x8d85:"劫",0x8d86:"号",0x8d87:"合",0x8d88:"壕",0x8d89:"拷",0x8d8a:"濠",0x8d8b:"豪",0x8d8c:"轟",0x8d8d:"麹",0x8d8e:"克",0x8d8f:"刻",0x8d90:"告",0x8d91:"国",0x8d92:"穀",0x8d93:"酷",0x8d94:"鵠",0x8d95:"黒",0x8d96:"獄",0x8d97:"漉",0x8d98:"腰",0x8d99:"甑",0x8d9a:"忽",0x8d9b:"惚",0x8d9c:"骨",0x8d9d:"狛",0x8d9e:"込",0x8d9f:"此",0x8da0:"頃",0x8da1:"今",0x8da2:"困",0x8da3:"坤",0x8da4:"墾",0x8da5:"婚",0x8da6:"恨",0x8da7:"懇",0x8da8:"昏",0x8da9:"昆",0x8daa:"根",0x8dab:"梱",0x8dac:"混",0x8dad:"痕",0x8dae:"紺",0x8daf:"艮",0x8db0:"魂",0x8db1:"些",0x8db2:"佐",0x8db3:"叉",0x8db4:"唆",0x8db5:"嵯",0x8db6:"左",0x8db7:"差",0x8db8:"査",0x8db9:"沙",0x8dba:"瑳",0x8dbb:"砂",0x8dbc:"詐",0x8dbd:"鎖",0x8dbe:"裟",0x8dbf:"坐",0x8dc0:"座",0x8dc1:"挫",0x8dc2:"債",0x8dc3:"催",0x8dc4:"再",0x8dc5:"最",0x8dc6:"哉",0x8dc7:"塞",0x8dc8:"妻",0x8dc9:"宰",0x8dca:"彩",0x8dcb:"才",0x8dcc:"採",0x8dcd:"栽",0x8dce:"歳",0x8dcf:"済",0x8dd0:"災",0x8dd1:"采",0x8dd2:"犀",0x8dd3:"砕",0x8dd4:"砦",0x8dd5:"祭",0x8dd6:"斎",0x8dd7:"細",0x8dd8:"菜",0x8dd9:"裁",0x8dda:"載",0x8ddb:"際",0x8ddc:"剤",0x8ddd:"在",0x8dde:"材",0x8ddf:"罪",0x8de0:"財",0x8de1:"冴",0x8de2:"坂",0x8de3:"阪",0x8de4:"堺",0x8de5:"榊",0x8de6:"肴",0x8de7:"咲",0x8de8:"崎",0x8de9:"埼",0x8dea:"碕",0x8deb:"鷺",0x8dec:"作",0x8ded:"削",0x8dee:"咋",0x8def:"搾",0x8df0:"昨",0x8df1:"朔",0x8df2:"柵",0x8df3:"窄",0x8df4:"策",0x8df5:"索",0x8df6:"錯",0x8df7:"桜",0x8df8:"鮭",0x8df9:"笹",0x8dfa:"匙",0x8dfb:"冊",0x8dfc:"刷",0x8e40:"察",0x8e41:"拶",0x8e42:"撮",0x8e43:"擦",0x8e44:"札",0x8e45:"殺",0x8e46:"薩",0x8e47:"雑",0x8e48:"皐",0x8e49:"鯖",0x8e4a:"捌",0x8e4b:"錆",0x8e4c:"鮫",0x8e4d:"皿",0x8e4e:"晒",0x8e4f:"三",0x8e50:"傘",0x8e51:"参",0x8e52:"山",0x8e53:"惨",0x8e54:"撒",0x8e55:"散",0x8e56:"桟",0x8e57:"燦",0x8e58:"珊",0x8e59:"産",0x8e5a:"算",0x8e5b:"纂",0x8e5c:"蚕",0x8e5d:"讃",0x8e5e:"賛",0x8e5f:"酸",0x8e60:"餐",0x8e61:"斬",0x8e62:"暫",0x8e63:"残",0x8e64:"仕",0x8e65:"仔",0x8e66:"伺",0x8e67:"使",0x8e68:"刺",0x8e69:"司",0x8e6a:"史",0x8e6b:"嗣",0x8e6c:"四",0x8e6d:"士",0x8e6e:"始",0x8e6f:"姉",0x8e70:"姿",0x8e71:"子",0x8e72:"屍",0x8e73:"市",0x8e74:"師",0x8e75:"志",0x8e76:"思",0x8e77:"指",0x8e78:"支",0x8e79:"孜",0x8e7a:"斯",0x8e7b:"施",0x8e7c:"旨",0x8e7d:"枝",0x8e7e:"止",0x8e80:"死",0x8e81:"氏",0x8e82:"獅",0x8e83:"祉",0x8e84:"私",0x8e85:"糸",0x8e86:"紙",0x8e87:"紫",0x8e88:"肢",0x8e89:"脂",0x8e8a:"至",0x8e8b:"視",0x8e8c:"詞",0x8e8d:"詩",0x8e8e:"試",0x8e8f:"誌",0x8e90:"諮",0x8e91:"資",0x8e92:"賜",0x8e93:"雌",0x8e94:"飼",0x8e95:"歯",0x8e96:"事",0x8e97:"似",0x8e98:"侍",0x8e99:"児",0x8e9a:"字",0x8e9b:"寺",0x8e9c:"慈",0x8e9d:"持",0x8e9e:"時",0x8e9f:"次",0x8ea0:"滋",0x8ea1:"治",0x8ea2:"爾",0x8ea3:"璽",0x8ea4:"痔",0x8ea5:"磁",0x8ea6:"示",0x8ea7:"而",0x8ea8:"耳",0x8ea9:"自",0x8eaa:"蒔",0x8eab:"辞",0x8eac:"汐",0x8ead:"鹿",0x8eae:"式",0x8eaf:"識",0x8eb0:"鴫",0x8eb1:"竺",0x8eb2:"軸",0x8eb3:"宍",0x8eb4:"雫",0x8eb5:"七",0x8eb6:"叱",0x8eb7:"執",0x8eb8:"失",0x8eb9:"嫉",0x8eba:"室",0x8ebb:"悉",0x8ebc:"湿",0x8ebd:"漆",0x8ebe:"疾",0x8ebf:"質",0x8ec0:"実",0x8ec1:"蔀",0x8ec2:"篠",0x8ec3:"偲",0x8ec4:"柴",0x8ec5:"芝",0x8ec6:"屡",0x8ec7:"蕊",0x8ec8:"縞",0x8ec9:"舎",0x8eca:"写",0x8ecb:"射",0x8ecc:"捨",0x8ecd:"赦",0x8ece:"斜",0x8ecf:"煮",0x8ed0:"社",0x8ed1:"紗",0x8ed2:"者",0x8ed3:"謝",0x8ed4:"車",0x8ed5:"遮",0x8ed6:"蛇",0x8ed7:"邪",0x8ed8:"借",0x8ed9:"勺",0x8eda:"尺",0x8edb:"杓",0x8edc:"灼",0x8edd:"爵",0x8ede:"酌",0x8edf:"釈",0x8ee0:"錫",0x8ee1:"若",0x8ee2:"寂",0x8ee3:"弱",0x8ee4:"惹",0x8ee5:"主",0x8ee6:"取",0x8ee7:"守",0x8ee8:"手",0x8ee9:"朱",0x8eea:"殊",0x8eeb:"狩",0x8eec:"珠",0x8eed:"種",0x8eee:"腫",0x8eef:"趣",0x8ef0:"酒",0x8ef1:"首",0x8ef2:"儒",0x8ef3:"受",0x8ef4:"呪",0x8ef5:"寿",0x8ef6:"授",0x8ef7:"樹",0x8ef8:"綬",0x8ef9:"需",0x8efa:"囚",0x8efb:"収",0x8efc:"周",0x8f40:"宗",0x8f41:"就",0x8f42:"州",0x8f43:"修",0x8f44:"愁",0x8f45:"拾",0x8f46:"洲",0x8f47:"秀",0x8f48:"秋",0x8f49:"終",0x8f4a:"繍",0x8f4b:"習",0x8f4c:"臭",0x8f4d:"舟",0x8f4e:"蒐",0x8f4f:"衆",0x8f50:"襲",0x8f51:"讐",0x8f52:"蹴",0x8f53:"輯",0x8f54:"週",0x8f55:"酋",0x8f56:"酬",0x8f57:"集",0x8f58:"醜",0x8f59:"什",0x8f5a:"住",0x8f5b:"充",0x8f5c:"十",0x8f5d:"従",0x8f5e:"戎",0x8f5f:"柔",0x8f60:"汁",0x8f61:"渋",0x8f62:"獣",0x8f63:"縦",0x8f64:"重",0x8f65:"銃",0x8f66:"叔",0x8f67:"夙",0x8f68:"宿",0x8f69:"淑",0x8f6a:"祝",0x8f6b:"縮",0x8f6c:"粛",0x8f6d:"塾",0x8f6e:"熟",0x8f6f:"出",0x8f70:"術",0x8f71:"述",0x8f72:"俊",0x8f73:"峻",0x8f74:"春",0x8f75:"瞬",0x8f76:"竣",0x8f77:"舜",0x8f78:"駿",0x8f79:"准",0x8f7a:"循",0x8f7b:"旬",0x8f7c:"楯",0x8f7d:"殉",0x8f7e:"淳",0x8f80:"準",0x8f81:"潤",0x8f82:"盾",0x8f83:"純",0x8f84:"巡",0x8f85:"遵",0x8f86:"醇",0x8f87:"順",0x8f88:"処",0x8f89:"初",0x8f8a:"所",0x8f8b:"暑",0x8f8c:"曙",0x8f8d:"渚",0x8f8e:"庶",0x8f8f:"緒",0x8f90:"署",0x8f91:"書",0x8f92:"薯",0x8f93:"藷",0x8f94:"諸",0x8f95:"助",0x8f96:"叙",0x8f97:"女",0x8f98:"序",0x8f99:"徐",0x8f9a:"恕",0x8f9b:"鋤",0x8f9c:"除",0x8f9d:"傷",0x8f9e:"償",0x8f9f:"勝",0x8fa0:"匠",0x8fa1:"升",0x8fa2:"召",0x8fa3:"哨",0x8fa4:"商",0x8fa5:"唱",0x8fa6:"嘗",0x8fa7:"奨",0x8fa8:"妾",0x8fa9:"娼",0x8faa:"宵",0x8fab:"将",0x8fac:"小",0x8fad:"少",0x8fae:"尚",0x8faf:"庄",0x8fb0:"床",0x8fb1:"廠",0x8fb2:"彰",0x8fb3:"承",0x8fb4:"抄",0x8fb5:"招",0x8fb6:"掌",0x8fb7:"捷",0x8fb8:"昇",0x8fb9:"昌",0x8fba:"昭",0x8fbb:"晶",0x8fbc:"松",0x8fbd:"梢",0x8fbe:"樟",0x8fbf:"樵",0x8fc0:"沼",0x8fc1:"消",0x8fc2:"渉",0x8fc3:"湘",0x8fc4:"焼",0x8fc5:"焦",0x8fc6:"照",0x8fc7:"症",0x8fc8:"省",0x8fc9:"硝",0x8fca:"礁",0x8fcb:"祥",0x8fcc:"称",0x8fcd:"章",0x8fce:"笑",0x8fcf:"粧",0x8fd0:"紹",0x8fd1:"肖",0x8fd2:"菖",0x8fd3:"蒋",0x8fd4:"蕉",0x8fd5:"衝",0x8fd6:"裳",0x8fd7:"訟",0x8fd8:"証",0x8fd9:"詔",0x8fda:"詳",0x8fdb:"象",0x8fdc:"賞",0x8fdd:"醤",0x8fde:"鉦",0x8fdf:"鍾",0x8fe0:"鐘",0x8fe1:"障",0x8fe2:"鞘",0x8fe3:"上",0x8fe4:"丈",0x8fe5:"丞",0x8fe6:"乗",0x8fe7:"冗",0x8fe8:"剰",0x8fe9:"城",0x8fea:"場",0x8feb:"壌",0x8fec:"嬢",0x8fed:"常",0x8fee:"情",0x8fef:"擾",0x8ff0:"条",0x8ff1:"杖",0x8ff2:"浄",0x8ff3:"状",0x8ff4:"畳",0x8ff5:"穣",0x8ff6:"蒸",0x8ff7:"譲",0x8ff8:"醸",0x8ff9:"錠",0x8ffa:"嘱",0x8ffb:"埴",0x8ffc:"飾",0x9040:"拭",0x9041:"植",0x9042:"殖",0x9043:"燭",0x9044:"織",0x9045:"職",0x9046:"色",0x9047:"触",0x9048:"食",0x9049:"蝕",0x904a:"辱",0x904b:"尻",0x904c:"伸",0x904d:"信",0x904e:"侵",0x904f:"唇",0x9050:"娠",0x9051:"寝",0x9052:"審",0x9053:"心",0x9054:"慎",0x9055:"振",0x9056:"新",0x9057:"晋",0x9058:"森",0x9059:"榛",0x905a:"浸",0x905b:"深",0x905c:"申",0x905d:"疹",0x905e:"真",0x905f:"神",0x9060:"秦",0x9061:"紳",0x9062:"臣",0x9063:"芯",0x9064:"薪",0x9065:"親",0x9066:"診",0x9067:"身",0x9068:"辛",0x9069:"進",0x906a:"針",0x906b:"震",0x906c:"人",0x906d:"仁",0x906e:"刃",0x906f:"塵",0x9070:"壬",0x9071:"尋",0x9072:"甚",0x9073:"尽",0x9074:"腎",0x9075:"訊",0x9076:"迅",0x9077:"陣",0x9078:"靭",0x9079:"笥",0x907a:"諏",0x907b:"須",0x907c:"酢",0x907d:"図",0x907e:"厨",0x9080:"逗",0x9081:"吹",0x9082:"垂",0x9083:"帥",0x9084:"推",0x9085:"水",0x9086:"炊",0x9087:"睡",0x9088:"粋",0x9089:"翠",0x908a:"衰",0x908b:"遂",0x908c:"酔",0x908d:"錐",0x908e:"錘",0x908f:"随",0x9090:"瑞",0x9091:"髄",0x9092:"崇",0x9093:"嵩",0x9094:"数",0x9095:"枢",0x9096:"趨",0x9097:"雛",0x9098:"据",0x9099:"杉",0x909a:"椙",0x909b:"菅",0x909c:"頗",0x909d:"雀",0x909e:"裾",0x909f:"澄",0x90a0:"摺",0x90a1:"寸",0x90a2:"世",0x90a3:"瀬",0x90a4:"畝",0x90a5:"是",0x90a6:"凄",0x90a7:"制",0x90a8:"勢",0x90a9:"姓",0x90aa:"征",0x90ab:"性",0x90ac:"成",0x90ad:"政",0x90ae:"整",0x90af:"星",0x90b0:"晴",0x90b1:"棲",0x90b2:"栖",0x90b3:"正",0x90b4:"清",0x90b5:"牲",0x90b6:"生",0x90b7:"盛",0x90b8:"精",0x90b9:"聖",0x90ba:"声",0x90bb:"製",0x90bc:"西",0x90bd:"誠",0x90be:"誓",0x90bf:"請",0x90c0:"逝",0x90c1:"醒",0x90c2:"青",0x90c3:"静",0x90c4:"斉",0x90c5:"税",0x90c6:"脆",0x90c7:"隻",0x90c8:"席",0x90c9:"惜",0x90ca:"戚",0x90cb:"斥",0x90cc:"昔",0x90cd:"析",0x90ce:"石",0x90cf:"積",0x90d0:"籍",0x90d1:"績",0x90d2:"脊",0x90d3:"責",0x90d4:"赤",0x90d5:"跡",0x90d6:"蹟",0x90d7:"碩",0x90d8:"切",0x90d9:"拙",0x90da:"接",0x90db:"摂",0x90dc:"折",0x90dd:"設",0x90de:"窃",0x90df:"節",0x90e0:"説",0x90e1:"雪",0x90e2:"絶",0x90e3:"舌",0x90e4:"蝉",0x90e5:"仙",0x90e6:"先",0x90e7:"千",0x90e8:"占",0x90e9:"宣",0x90ea:"専",0x90eb:"尖",0x90ec:"川",0x90ed:"戦",0x90ee:"扇",0x90ef:"撰",0x90f0:"栓",0x90f1:"栴",0x90f2:"泉",0x90f3:"浅",0x90f4:"洗",0x90f5:"染",0x90f6:"潜",0x90f7:"煎",0x90f8:"煽",0x90f9:"旋",0x90fa:"穿",0x90fb:"箭",0x90fc:"線",0x9140:"繊",0x9141:"羨",0x9142:"腺",0x9143:"舛",0x9144:"船",0x9145:"薦",0x9146:"詮",0x9147:"賎",0x9148:"践",0x9149:"選",0x914a:"遷",0x914b:"銭",0x914c:"銑",0x914d:"閃",0x914e:"鮮",0x914f:"前",0x9150:"善",0x9151:"漸",0x9152:"然",0x9153:"全",0x9154:"禅",0x9155:"繕",0x9156:"膳",0x9157:"糎",0x9158:"噌",0x9159:"塑",0x915a:"岨",0x915b:"措",0x915c:"曾",0x915d:"曽",0x915e:"楚",0x915f:"狙",0x9160:"疏",0x9161:"疎",0x9162:"礎",0x9163:"祖",0x9164:"租",0x9165:"粗",0x9166:"素",0x9167:"組",0x9168:"蘇",0x9169:"訴",0x916a:"阻",0x916b:"遡",0x916c:"鼠",0x916d:"僧",0x916e:"創",0x916f:"双",0x9170:"叢",0x9171:"倉",0x9172:"喪",0x9173:"壮",0x9174:"奏",0x9175:"爽",0x9176:"宋",0x9177:"層",0x9178:"匝",0x9179:"惣",0x917a:"想",0x917b:"捜",0x917c:"掃",0x917d:"挿",0x917e:"掻",0x9180:"操",0x9181:"早",0x9182:"曹",0x9183:"巣",0x9184:"槍",0x9185:"槽",0x9186:"漕",0x9187:"燥",0x9188:"争",0x9189:"痩",0x918a:"相",0x918b:"窓",0x918c:"糟",0x918d:"総",0x918e:"綜",0x918f:"聡",0x9190:"草",0x9191:"荘",0x9192:"葬",0x9193:"蒼",0x9194:"藻",0x9195:"装",0x9196:"走",0x9197:"送",0x9198:"遭",0x9199:"鎗",0x919a:"霜",0x919b:"騒",0x919c:"像",0x919d:"増",0x919e:"憎",0x919f:"臓",0x91a0:"蔵",0x91a1:"贈",0x91a2:"造",0x91a3:"促",0x91a4:"側",0x91a5:"則",0x91a6:"即",0x91a7:"息",0x91a8:"捉",0x91a9:"束",0x91aa:"測",0x91ab:"足",0x91ac:"速",0x91ad:"俗",0x91ae:"属",0x91af:"賊",0x91b0:"族",0x91b1:"続",0x91b2:"卒",0x91b3:"袖",0x91b4:"其",0x91b5:"揃",0x91b6:"存",0x91b7:"孫",0x91b8:"尊",0x91b9:"損",0x91ba:"村",0x91bb:"遜",0x91bc:"他",0x91bd:"多",0x91be:"太",0x91bf:"汰",0x91c0:"詑",0x91c1:"唾",0x91c2:"堕",0x91c3:"妥",0x91c4:"惰",0x91c5:"打",0x91c6:"柁",0x91c7:"舵",0x91c8:"楕",0x91c9:"陀",0x91ca:"駄",0x91cb:"騨",0x91cc:"体",0x91cd:"堆",0x91ce:"対",0x91cf:"耐",0x91d0:"岱",0x91d1:"帯",0x91d2:"待",0x91d3:"怠",0x91d4:"態",0x91d5:"戴",0x91d6:"替",0x91d7:"泰",0x91d8:"滞",0x91d9:"胎",0x91da:"腿",0x91db:"苔",0x91dc:"袋",0x91dd:"貸",0x91de:"退",0x91df:"逮",0x91e0:"隊",0x91e1:"黛",0x91e2:"鯛",0x91e3:"代",0x91e4:"台",0x91e5:"大",0x91e6:"第",0x91e7:"醍",0x91e8:"題",0x91e9:"鷹",0x91ea:"滝",0x91eb:"瀧",0x91ec:"卓",0x91ed:"啄",0x91ee:"宅",0x91ef:"托",0x91f0:"択",0x91f1:"拓",0x91f2:"沢",0x91f3:"濯",0x91f4:"琢",0x91f5:"託",0x91f6:"鐸",0x91f7:"濁",0x91f8:"諾",0x91f9:"茸",0x91fa:"凧",0x91fb:"蛸",0x91fc:"只",0x9240:"叩",0x9241:"但",0x9242:"達",0x9243:"辰",0x9244:"奪",0x9245:"脱",0x9246:"巽",0x9247:"竪",0x9248:"辿",0x9249:"棚",0x924a:"谷",0x924b:"狸",0x924c:"鱈",0x924d:"樽",0x924e:"誰",0x924f:"丹",0x9250:"単",0x9251:"嘆",0x9252:"坦",0x9253:"担",0x9254:"探",0x9255:"旦",0x9256:"歎",0x9257:"淡",0x9258:"湛",0x9259:"炭",0x925a:"短",0x925b:"端",0x925c:"箪",0x925d:"綻",0x925e:"耽",0x925f:"胆",0x9260:"蛋",0x9261:"誕",0x9262:"鍛",0x9263:"団",0x9264:"壇",0x9265:"弾",0x9266:"断",0x9267:"暖",0x9268:"檀",0x9269:"段",0x926a:"男",0x926b:"談",0x926c:"値",0x926d:"知",0x926e:"地",0x926f:"弛",0x9270:"恥",0x9271:"智",0x9272:"池",0x9273:"痴",0x9274:"稚",0x9275:"置",0x9276:"致",0x9277:"蜘",0x9278:"遅",0x9279:"馳",0x927a:"築",0x927b:"畜",0x927c:"竹",0x927d:"筑",0x927e:"蓄",0x9280:"逐",0x9281:"秩",0x9282:"窒",0x9283:"茶",0x9284:"嫡",0x9285:"着",0x9286:"中",0x9287:"仲",0x9288:"宙",0x9289:"忠",0x928a:"抽",0x928b:"昼",0x928c:"柱",0x928d:"注",0x928e:"虫",0x928f:"衷",0x9290:"註",0x9291:"酎",0x9292:"鋳",0x9293:"駐",0x9294:"樗",0x9295:"瀦",0x9296:"猪",0x9297:"苧",0x9298:"著",0x9299:"貯",0x929a:"丁",0x929b:"兆",0x929c:"凋",0x929d:"喋",0x929e:"寵",0x929f:"帖",0x92a0:"帳",0x92a1:"庁",0x92a2:"弔",0x92a3:"張",0x92a4:"彫",0x92a5:"徴",0x92a6:"懲",0x92a7:"挑",0x92a8:"暢",0x92a9:"朝",0x92aa:"潮",0x92ab:"牒",0x92ac:"町",0x92ad:"眺",0x92ae:"聴",0x92af:"脹",0x92b0:"腸",0x92b1:"蝶",0x92b2:"調",0x92b3:"諜",0x92b4:"超",0x92b5:"跳",0x92b6:"銚",0x92b7:"長",0x92b8:"頂",0x92b9:"鳥",0x92ba:"勅",0x92bb:"捗",0x92bc:"直",0x92bd:"朕",0x92be:"沈",0x92bf:"珍",0x92c0:"賃",0x92c1:"鎮",0x92c2:"陳",0x92c3:"津",0x92c4:"墜",0x92c5:"椎",0x92c6:"槌",0x92c7:"追",0x92c8:"鎚",0x92c9:"痛",0x92ca:"通",0x92cb:"塚",0x92cc:"栂",0x92cd:"掴",0x92ce:"槻",0x92cf:"佃",0x92d0:"漬",0x92d1:"柘",0x92d2:"辻",0x92d3:"蔦",0x92d4:"綴",0x92d5:"鍔",0x92d6:"椿",0x92d7:"潰",0x92d8:"坪",0x92d9:"壷",0x92da:"嬬",0x92db:"紬",0x92dc:"爪",0x92dd:"吊",0x92de:"釣",0x92df:"鶴",0x92e0:"亭",0x92e1:"低",0x92e2:"停",0x92e3:"偵",0x92e4:"剃",0x92e5:"貞",0x92e6:"呈",0x92e7:"堤",0x92e8:"定",0x92e9:"帝",0x92ea:"底",0x92eb:"庭",0x92ec:"廷",0x92ed:"弟",0x92ee:"悌",0x92ef:"抵",0x92f0:"挺",0x92f1:"提",0x92f2:"梯",0x92f3:"汀",0x92f4:"碇",0x92f5:"禎",0x92f6:"程",0x92f7:"締",0x92f8:"艇",0x92f9:"訂",0x92fa:"諦",0x92fb:"蹄",0x92fc:"逓",0x9340:"邸",0x9341:"鄭",0x9342:"釘",0x9343:"鼎",0x9344:"泥",0x9345:"摘",0x9346:"擢",0x9347:"敵",0x9348:"滴",0x9349:"的",0x934a:"笛",0x934b:"適",0x934c:"鏑",0x934d:"溺",0x934e:"哲",0x934f:"徹",0x9350:"撤",0x9351:"轍",0x9352:"迭",0x9353:"鉄",0x9354:"典",0x9355:"填",0x9356:"天",0x9357:"展",0x9358:"店",0x9359:"添",0x935a:"纏",0x935b:"甜",0x935c:"貼",0x935d:"転",0x935e:"顛",0x935f:"点",0x9360:"伝",0x9361:"殿",0x9362:"澱",0x9363:"田",0x9364:"電",0x9365:"兎",0x9366:"吐",0x9367:"堵",0x9368:"塗",0x9369:"妬",0x936a:"屠",0x936b:"徒",0x936c:"斗",0x936d:"杜",0x936e:"渡",0x936f:"登",0x9370:"菟",0x9371:"賭",0x9372:"途",0x9373:"都",0x9374:"鍍",0x9375:"砥",0x9376:"砺",0x9377:"努",0x9378:"度",0x9379:"土",0x937a:"奴",0x937b:"怒",0x937c:"倒",0x937d:"党",0x937e:"冬",0x9380:"凍",0x9381:"刀",0x9382:"唐",0x9383:"塔",0x9384:"塘",0x9385:"套",0x9386:"宕",0x9387:"島",0x9388:"嶋",0x9389:"悼",0x938a:"投",0x938b:"搭",0x938c:"東",0x938d:"桃",0x938e:"梼",0x938f:"棟",0x9390:"盗",0x9391:"淘",0x9392:"湯",0x9393:"涛",0x9394:"灯",0x9395:"燈",0x9396:"当",0x9397:"痘",0x9398:"祷",0x9399:"等",0x939a:"答",0x939b:"筒",0x939c:"糖",0x939d:"統",0x939e:"到",0x939f:"董",0x93a0:"蕩",0x93a1:"藤",0x93a2:"討",0x93a3:"謄",0x93a4:"豆",0x93a5:"踏",0x93a6:"逃",0x93a7:"透",0x93a8:"鐙",0x93a9:"陶",0x93aa:"頭",0x93ab:"騰",0x93ac:"闘",0x93ad:"働",0x93ae:"動",0x93af:"同",0x93b0:"堂",0x93b1:"導",0x93b2:"憧",0x93b3:"撞",0x93b4:"洞",0x93b5:"瞳",0x93b6:"童",0x93b7:"胴",0x93b8:"萄",0x93b9:"道",0x93ba:"銅",0x93bb:"峠",0x93bc:"鴇",0x93bd:"匿",0x93be:"得",0x93bf:"徳",0x93c0:"涜",0x93c1:"特",0x93c2:"督",0x93c3:"禿",0x93c4:"篤",0x93c5:"毒",0x93c6:"独",0x93c7:"読",0x93c8:"栃",0x93c9:"橡",0x93ca:"凸",0x93cb:"突",0x93cc:"椴",0x93cd:"届",0x93ce:"鳶",0x93cf:"苫",0x93d0:"寅",0x93d1:"酉",0x93d2:"瀞",0x93d3:"噸",0x93d4:"屯",0x93d5:"惇",0x93d6:"敦",0x93d7:"沌",0x93d8:"豚",0x93d9:"遁",0x93da:"頓",0x93db:"呑",0x93dc:"曇",0x93dd:"鈍",0x93de:"奈",0x93df:"那",0x93e0:"内",0x93e1:"乍",0x93e2:"凪",0x93e3:"薙",0x93e4:"謎",0x93e5:"灘",0x93e6:"捺",0x93e7:"鍋",0x93e8:"楢",0x93e9:"馴",0x93ea:"縄",0x93eb:"畷",0x93ec:"南",0x93ed:"楠",0x93ee:"軟",0x93ef:"難",0x93f0:"汝",0x93f1:"二",0x93f2:"尼",0x93f3:"弐",0x93f4:"迩",0x93f5:"匂",0x93f6:"賑",0x93f7:"肉",0x93f8:"虹",0x93f9:"廿",0x93fa:"日",0x93fb:"乳",0x93fc:"入",0x9440:"如",0x9441:"尿",0x9442:"韮",0x9443:"任",0x9444:"妊",0x9445:"忍",0x9446:"認",0x9447:"濡",0x9448:"禰",0x9449:"祢",0x944a:"寧",0x944b:"葱",0x944c:"猫",0x944d:"熱",0x944e:"年",0x944f:"念",0x9450:"捻",0x9451:"撚",0x9452:"燃",0x9453:"粘",0x9454:"乃",0x9455:"廼",0x9456:"之",0x9457:"埜",0x9458:"嚢",0x9459:"悩",0x945a:"濃",0x945b:"納",0x945c:"能",0x945d:"脳",0x945e:"膿",0x945f:"農",0x9460:"覗",0x9461:"蚤",0x9462:"巴",0x9463:"把",0x9464:"播",0x9465:"覇",0x9466:"杷",0x9467:"波",0x9468:"派",0x9469:"琶",0x946a:"破",0x946b:"婆",0x946c:"罵",0x946d:"芭",0x946e:"馬",0x946f:"俳",0x9470:"廃",0x9471:"拝",0x9472:"排",0x9473:"敗",0x9474:"杯",0x9475:"盃",0x9476:"牌",0x9477:"背",0x9478:"肺",0x9479:"輩",0x947a:"配",0x947b:"倍",0x947c:"培",0x947d:"媒",0x947e:"梅",0x9480:"楳",0x9481:"煤",0x9482:"狽",0x9483:"買",0x9484:"売",0x9485:"賠",0x9486:"陪",0x9487:"這",0x9488:"蝿",0x9489:"秤",0x948a:"矧",0x948b:"萩",0x948c:"伯",0x948d:"剥",0x948e:"博",0x948f:"拍",0x9490:"柏",0x9491:"泊",0x9492:"白",0x9493:"箔",0x9494:"粕",0x9495:"舶",0x9496:"薄",0x9497:"迫",0x9498:"曝",0x9499:"漠",0x949a:"爆",0x949b:"縛",0x949c:"莫",0x949d:"駁",0x949e:"麦",0x949f:"函",0x94a0:"箱",0x94a1:"硲",0x94a2:"箸",0x94a3:"肇",0x94a4:"筈",0x94a5:"櫨",0x94a6:"幡",0x94a7:"肌",0x94a8:"畑",0x94a9:"畠",0x94aa:"八",0x94ab:"鉢",0x94ac:"溌",0x94ad:"発",0x94ae:"醗",0x94af:"髪",0x94b0:"伐",0x94b1:"罰",0x94b2:"抜",0x94b3:"筏",0x94b4:"閥",0x94b5:"鳩",0x94b6:"噺",0x94b7:"塙",0x94b8:"蛤",0x94b9:"隼",0x94ba:"伴",0x94bb:"判",0x94bc:"半",0x94bd:"反",0x94be:"叛",0x94bf:"帆",0x94c0:"搬",0x94c1:"斑",0x94c2:"板",0x94c3:"氾",0x94c4:"汎",0x94c5:"版",0x94c6:"犯",0x94c7:"班",0x94c8:"畔",0x94c9:"繁",0x94ca:"般",0x94cb:"藩",0x94cc:"販",0x94cd:"範",0x94ce:"釆",0x94cf:"煩",0x94d0:"頒",0x94d1:"飯",0x94d2:"挽",0x94d3:"晩",0x94d4:"番",0x94d5:"盤",0x94d6:"磐",0x94d7:"蕃",0x94d8:"蛮",0x94d9:"匪",0x94da:"卑",0x94db:"否",0x94dc:"妃",0x94dd:"庇",0x94de:"彼",0x94df:"悲",0x94e0:"扉",0x94e1:"批",0x94e2:"披",0x94e3:"斐",0x94e4:"比",0x94e5:"泌",0x94e6:"疲",0x94e7:"皮",0x94e8:"碑",0x94e9:"秘",0x94ea:"緋",0x94eb:"罷",0x94ec:"肥",0x94ed:"被",0x94ee:"誹",0x94ef:"費",0x94f0:"避",0x94f1:"非",0x94f2:"飛",0x94f3:"樋",0x94f4:"簸",0x94f5:"備",0x94f6:"尾",0x94f7:"微",0x94f8:"枇",0x94f9:"毘",0x94fa:"琵",0x94fb:"眉",0x94fc:"美",0x9540:"鼻",0x9541:"柊",0x9542:"稗",0x9543:"匹",0x9544:"疋",0x9545:"髭",0x9546:"彦",0x9547:"膝",0x9548:"菱",0x9549:"肘",0x954a:"弼",0x954b:"必",0x954c:"畢",0x954d:"筆",0x954e:"逼",0x954f:"桧",0x9550:"姫",0x9551:"媛",0x9552:"紐",0x9553:"百",0x9554:"謬",0x9555:"俵",0x9556:"彪",0x9557:"標",0x9558:"氷",0x9559:"漂",0x955a:"瓢",0x955b:"票",0x955c:"表",0x955d:"評",0x955e:"豹",0x955f:"廟",0x9560:"描",0x9561:"病",0x9562:"秒",0x9563:"苗",0x9564:"錨",0x9565:"鋲",0x9566:"蒜",0x9567:"蛭",0x9568:"鰭",0x9569:"品",0x956a:"彬",0x956b:"斌",0x956c:"浜",0x956d:"瀕",0x956e:"貧",0x956f:"賓",0x9570:"頻",0x9571:"敏",0x9572:"瓶",0x9573:"不",0x9574:"付",0x9575:"埠",0x9576:"夫",0x9577:"婦",0x9578:"富",0x9579:"冨",0x957a:"布",0x957b:"府",0x957c:"怖",0x957d:"扶",0x957e:"敷",0x9580:"斧",0x9581:"普",0x9582:"浮",0x9583:"父",0x9584:"符",0x9585:"腐",0x9586:"膚",0x9587:"芙",0x9588:"譜",0x9589:"負",0x958a:"賦",0x958b:"赴",0x958c:"阜",0x958d:"附",0x958e:"侮",0x958f:"撫",0x9590:"武",0x9591:"舞",0x9592:"葡",0x9593:"蕪",0x9594:"部",0x9595:"封",0x9596:"楓",0x9597:"風",0x9598:"葺",0x9599:"蕗",0x959a:"伏",0x959b:"副",0x959c:"復",0x959d:"幅",0x959e:"服",0x959f:"福",0x95a0:"腹",0x95a1:"複",0x95a2:"覆",0x95a3:"淵",0x95a4:"弗",0x95a5:"払",0x95a6:"沸",0x95a7:"仏",0x95a8:"物",0x95a9:"鮒",0x95aa:"分",0x95ab:"吻",0x95ac:"噴",0x95ad:"墳",0x95ae:"憤",0x95af:"扮",0x95b0:"焚",0x95b1:"奮",0x95b2:"粉",0x95b3:"糞",0x95b4:"紛",0x95b5:"雰",0x95b6:"文",0x95b7:"聞",0x95b8:"丙",0x95b9:"併",0x95ba:"兵",0x95bb:"塀",0x95bc:"幣",0x95bd:"平",0x95be:"弊",0x95bf:"柄",0x95c0:"並",0x95c1:"蔽",0x95c2:"閉",0x95c3:"陛",0x95c4:"米",0x95c5:"頁",0x95c6:"僻",0x95c7:"壁",0x95c8:"癖",0x95c9:"碧",0x95ca:"別",0x95cb:"瞥",0x95cc:"蔑",0x95cd:"箆",0x95ce:"偏",0x95cf:"変",0x95d0:"片",0x95d1:"篇",0x95d2:"編",0x95d3:"辺",0x95d4:"返",0x95d5:"遍",0x95d6:"便",0x95d7:"勉",0x95d8:"娩",0x95d9:"弁",0x95da:"鞭",0x95db:"保",0x95dc:"舗",0x95dd:"鋪",0x95de:"圃",0x95df:"捕",0x95e0:"歩",0x95e1:"甫",0x95e2:"補",0x95e3:"輔",0x95e4:"穂",0x95e5:"募",0x95e6:"墓",0x95e7:"慕",0x95e8:"戊",0x95e9:"暮",0x95ea:"母",0x95eb:"簿",0x95ec:"菩",0x95ed:"倣",0x95ee:"俸",0x95ef:"包",0x95f0:"呆",0x95f1:"報",0x95f2:"奉",0x95f3:"宝",0x95f4:"峰",0x95f5:"峯",0x95f6:"崩",0x95f7:"庖",0x95f8:"抱",0x95f9:"捧",0x95fa:"放",0x95fb:"方",0x95fc:"朋",0x9640:"法",0x9641:"泡",0x9642:"烹",0x9643:"砲",0x9644:"縫",0x9645:"胞",0x9646:"芳",0x9647:"萌",0x9648:"蓬",0x9649:"蜂",0x964a:"褒",0x964b:"訪",0x964c:"豊",0x964d:"邦",0x964e:"鋒",0x964f:"飽",0x9650:"鳳",0x9651:"鵬",0x9652:"乏",0x9653:"亡",0x9654:"傍",0x9655:"剖",0x9656:"坊",0x9657:"妨",0x9658:"帽",0x9659:"忘",0x965a:"忙",0x965b:"房",0x965c:"暴",0x965d:"望",0x965e:"某",0x965f:"棒",0x9660:"冒",0x9661:"紡",0x9662:"肪",0x9663:"膨",0x9664:"謀",0x9665:"貌",0x9666:"貿",0x9667:"鉾",0x9668:"防",0x9669:"吠",0x966a:"頬",0x966b:"北",0x966c:"僕",0x966d:"卜",0x966e:"墨",0x966f:"撲",0x9670:"朴",0x9671:"牧",0x9672:"睦",0x9673:"穆",0x9674:"釦",0x9675:"勃",0x9676:"没",0x9677:"殆",0x9678:"堀",0x9679:"幌",0x967a:"奔",0x967b:"本",0x967c:"翻",0x967d:"凡",0x967e:"盆",0x9680:"摩",0x9681:"磨",0x9682:"魔",0x9683:"麻",0x9684:"埋",0x9685:"妹",0x9686:"昧",0x9687:"枚",0x9688:"毎",0x9689:"哩",0x968a:"槙",0x968b:"幕",0x968c:"膜",0x968d:"枕",0x968e:"鮪",0x968f:"柾",0x9690:"鱒",0x9691:"桝",0x9692:"亦",0x9693:"俣",0x9694:"又",0x9695:"抹",0x9696:"末",0x9697:"沫",0x9698:"迄",0x9699:"侭",0x969a:"繭",0x969b:"麿",0x969c:"万",0x969d:"慢",0x969e:"満",0x969f:"漫",0x96a0:"蔓",0x96a1:"味",0x96a2:"未",0x96a3:"魅",0x96a4:"巳",0x96a5:"箕",0x96a6:"岬",0x96a7:"密",0x96a8:"蜜",0x96a9:"湊",0x96aa:"蓑",0x96ab:"稔",0x96ac:"脈",0x96ad:"妙",0x96ae:"粍",0x96af:"民",0x96b0:"眠",0x96b1:"務",0x96b2:"夢",0x96b3:"無",0x96b4:"牟",0x96b5:"矛",0x96b6:"霧",0x96b7:"鵡",0x96b8:"椋",0x96b9:"婿",0x96ba:"娘",0x96bb:"冥",0x96bc:"名",0x96bd:"命",0x96be:"明",0x96bf:"盟",0x96c0:"迷",0x96c1:"銘",0x96c2:"鳴",0x96c3:"姪",0x96c4:"牝",0x96c5:"滅",0x96c6:"免",0x96c7:"棉",0x96c8:"綿",0x96c9:"緬",0x96ca:"面",0x96cb:"麺",0x96cc:"摸",0x96cd:"模",0x96ce:"茂",0x96cf:"妄",0x96d0:"孟",0x96d1:"毛",0x96d2:"猛",0x96d3:"盲",0x96d4:"網",0x96d5:"耗",0x96d6:"蒙",0x96d7:"儲",0x96d8:"木",0x96d9:"黙",0x96da:"目",0x96db:"杢",0x96dc:"勿",0x96dd:"餅",0x96de:"尤",0x96df:"戻",0x96e0:"籾",0x96e1:"貰",0x96e2:"問",0x96e3:"悶",0x96e4:"紋",0x96e5:"門",0x96e6:"匁",0x96e7:"也",0x96e8:"冶",0x96e9:"夜",0x96ea:"爺",0x96eb:"耶",0x96ec:"野",0x96ed:"弥",0x96ee:"矢",0x96ef:"厄",0x96f0:"役",0x96f1:"約",0x96f2:"薬",0x96f3:"訳",0x96f4:"躍",0x96f5:"靖",0x96f6:"柳",0x96f7:"薮",0x96f8:"鑓",0x96f9:"愉",0x96fa:"愈",0x96fb:"油",0x96fc:"癒",0x9740:"諭",0x9741:"輸",0x9742:"唯",0x9743:"佑",0x9744:"優",0x9745:"勇",0x9746:"友",0x9747:"宥",0x9748:"幽",0x9749:"悠",0x974a:"憂",0x974b:"揖",0x974c:"有",0x974d:"柚",0x974e:"湧",0x974f:"涌",0x9750:"猶",0x9751:"猷",0x9752:"由",0x9753:"祐",0x9754:"裕",0x9755:"誘",0x9756:"遊",0x9757:"邑",0x9758:"郵",0x9759:"雄",0x975a:"融",0x975b:"夕",0x975c:"予",0x975d:"余",0x975e:"与",0x975f:"誉",0x9760:"輿",0x9761:"預",0x9762:"傭",0x9763:"幼",0x9764:"妖",0x9765:"容",0x9766:"庸",0x9767:"揚",0x9768:"揺",0x9769:"擁",0x976a:"曜",0x976b:"楊",0x976c:"様",0x976d:"洋",0x976e:"溶",0x976f:"熔",0x9770:"用",0x9771:"窯",0x9772:"羊",0x9773:"耀",0x9774:"葉",0x9775:"蓉",0x9776:"要",0x9777:"謡",0x9778:"踊",0x9779:"遥",0x977a:"陽",0x977b:"養",0x977c:"慾",0x977d:"抑",0x977e:"欲",0x9780:"沃",0x9781:"浴",0x9782:"翌",0x9783:"翼",0x9784:"淀",0x9785:"羅",0x9786:"螺",0x9787:"裸",0x9788:"来",0x9789:"莱",0x978a:"頼",0x978b:"雷",0x978c:"洛",0x978d:"絡",0x978e:"落",0x978f:"酪",0x9790:"乱",0x9791:"卵",0x9792:"嵐",0x9793:"欄",0x9794:"濫",0x9795:"藍",0x9796:"蘭",0x9797:"覧",0x9798:"利",0x9799:"吏",0x979a:"履",0x979b:"李",0x979c:"梨",0x979d:"理",0x979e:"璃",0x979f:"痢",0x97a0:"裏",0x97a1:"裡",0x97a2:"里",0x97a3:"離",0x97a4:"陸",0x97a5:"律",0x97a6:"率",0x97a7:"立",0x97a8:"葎",0x97a9:"掠",0x97aa:"略",0x97ab:"劉",0x97ac:"流",0x97ad:"溜",0x97ae:"琉",0x97af:"留",0x97b0:"硫",0x97b1:"粒",0x97b2:"隆",0x97b3:"竜",0x97b4:"龍",0x97b5:"侶",0x97b6:"慮",0x97b7:"旅",0x97b8:"虜",0x97b9:"了",0x97ba:"亮",0x97bb:"僚",0x97bc:"両",0x97bd:"凌",0x97be:"寮",0x97bf:"料",0x97c0:"梁",0x97c1:"涼",0x97c2:"猟",0x97c3:"療",0x97c4:"瞭",0x97c5:"稜",0x97c6:"糧",0x97c7:"良",0x97c8:"諒",0x97c9:"遼",0x97ca:"量",0x97cb:"陵",0x97cc:"領",0x97cd:"力",0x97ce:"緑",0x97cf:"倫",0x97d0:"厘",0x97d1:"林",0x97d2:"淋",0x97d3:"燐",0x97d4:"琳",0x97d5:"臨",0x97d6:"輪",0x97d7:"隣",0x97d8:"鱗",0x97d9:"麟",0x97da:"瑠",0x97db:"塁",0x97dc:"涙",0x97dd:"累",0x97de:"類",0x97df:"令",0x97e0:"伶",0x97e1:"例",0x97e2:"冷",0x97e3:"励",0x97e4:"嶺",0x97e5:"怜",0x97e6:"玲",0x97e7:"礼",0x97e8:"苓",0x97e9:"鈴",0x97ea:"隷",0x97eb:"零",0x97ec:"霊",0x97ed:"麗",0x97ee:"齢",0x97ef:"暦",0x97f0:"歴",0x97f1:"列",0x97f2:"劣",0x97f3:"烈",0x97f4:"裂",0x97f5:"廉",0x97f6:"恋",0x97f7:"憐",0x97f8:"漣",0x97f9:"煉",0x97fa:"簾",0x97fb:"練",0x97fc:"聯",0x9840:"蓮",0x9841:"連",0x9842:"錬",0x9843:"呂",0x9844:"魯",0x9845:"櫓",0x9846:"炉",0x9847:"賂",0x9848:"路",0x9849:"露",0x984a:"労",0x984b:"婁",0x984c:"廊",0x984d:"弄",0x984e:"朗",0x984f:"楼",0x9850:"榔",0x9851:"浪",0x9852:"漏",0x9853:"牢",0x9854:"狼",0x9855:"篭",0x9856:"老",0x9857:"聾",0x9858:"蝋",0x9859:"郎",0x985a:"六",0x985b:"麓",0x985c:"禄",0x985d:"肋",0x985e:"録",0x985f:"論",0x9860:"倭",0x9861:"和",0x9862:"話",0x9863:"歪",0x9864:"賄",0x9865:"脇",0x9866:"惑",0x9867:"枠",0x9868:"鷲",0x9869:"亙",0x986a:"亘",0x986b:"鰐",0x986c:"詫",0x986d:"藁",0x986e:"蕨",0x986f:"椀",0x9870:"湾",0x9871:"碗",0x9872:"腕",0x989f:"弌",0x98a0:"丐",0x98a1:"丕",0x98a2:"个",0x98a3:"丱",0x98a4:"丶",0x98a5:"丼",0x98a6:"丿",0x98a7:"乂",0x98a8:"乖",0x98a9:"乘",0x98aa:"亂",0x98ab:"亅",0x98ac:"豫",0x98ad:"亊",0x98ae:"舒",0x98af:"弍",0x98b0:"于",0x98b1:"亞",0x98b2:"亟",0x98b3:"亠",0x98b4:"亢",0x98b5:"亰",0x98b6:"亳",0x98b7:"亶",0x98b8:"从",0x98b9:"仍",0x98ba:"仄",0x98bb:"仆",0x98bc:"仂",0x98bd:"仗",0x98be:"仞",0x98bf:"仭",0x98c0:"仟",0x98c1:"价",0x98c2:"伉",0x98c3:"佚",0x98c4:"估",0x98c5:"佛",0x98c6:"佝",0x98c7:"佗",0x98c8:"佇",0x98c9:"佶",0x98ca:"侈",0x98cb:"侏",0x98cc:"侘",0x98cd:"佻",0x98ce:"佩",0x98cf:"佰",0x98d0:"侑",0x98d1:"佯",0x98d2:"來",0x98d3:"侖",0x98d4:"儘",0x98d5:"俔",0x98d6:"俟",0x98d7:"俎",0x98d8:"俘",0x98d9:"俛",0x98da:"俑",0x98db:"俚",0x98dc:"俐",0x98dd:"俤",0x98de:"俥",0x98df:"倚",0x98e0:"倨",0x98e1:"倔",0x98e2:"倪",0x98e3:"倥",0x98e4:"倅",0x98e5:"伜",0x98e6:"俶",0x98e7:"倡",0x98e8:"倩",0x98e9:"倬",0x98ea:"俾",0x98eb:"俯",0x98ec:"們",0x98ed:"倆",0x98ee:"偃",0x98ef:"假",0x98f0:"會",0x98f1:"偕",0x98f2:"偐",0x98f3:"偈",0x98f4:"做",0x98f5:"偖",0x98f6:"偬",0x98f7:"偸",0x98f8:"傀",0x98f9:"傚",0x98fa:"傅",0x98fb:"傴",0x98fc:"傲",0x9940:"僉",0x9941:"僊",0x9942:"傳",0x9943:"僂",0x9944:"僖",0x9945:"僞",0x9946:"僥",0x9947:"僭",0x9948:"僣",0x9949:"僮",0x994a:"價",0x994b:"僵",0x994c:"儉",0x994d:"儁",0x994e:"儂",0x994f:"儖",0x9950:"儕",0x9951:"儔",0x9952:"儚",0x9953:"儡",0x9954:"儺",0x9955:"儷",0x9956:"儼",0x9957:"儻",0x9958:"儿",0x9959:"兀",0x995a:"兒",0x995b:"兌",0x995c:"兔",0x995d:"兢",0x995e:"竸",0x995f:"兩",0x9960:"兪",0x9961:"兮",0x9962:"冀",0x9963:"冂",0x9964:"囘",0x9965:"册",0x9966:"冉",0x9967:"冏",0x9968:"冑",0x9969:"冓",0x996a:"冕",0x996b:"冖",0x996c:"冤",0x996d:"冦",0x996e:"冢",0x996f:"冩",0x9970:"冪",0x9971:"冫",0x9972:"决",0x9973:"冱",0x9974:"冲",0x9975:"冰",0x9976:"况",0x9977:"冽",0x9978:"凅",0x9979:"凉",0x997a:"凛",0x997b:"几",0x997c:"處",0x997d:"凩",0x997e:"凭",0x9980:"凰",0x9981:"凵",0x9982:"凾",0x9983:"刄",0x9984:"刋",0x9985:"刔",0x9986:"刎",0x9987:"刧",0x9988:"刪",0x9989:"刮",0x998a:"刳",0x998b:"刹",0x998c:"剏",0x998d:"剄",0x998e:"剋",0x998f:"剌",0x9990:"剞",0x9991:"剔",0x9992:"剪",0x9993:"剴",0x9994:"剩",0x9995:"剳",0x9996:"剿",0x9997:"剽",0x9998:"劍",0x9999:"劔",0x999a:"劒",0x999b:"剱",0x999c:"劈",0x999d:"劑",0x999e:"辨",0x999f:"辧",0x99a0:"劬",0x99a1:"劭",0x99a2:"劼",0x99a3:"劵",0x99a4:"勁",0x99a5:"勍",0x99a6:"勗",0x99a7:"勞",0x99a8:"勣",0x99a9:"勦",0x99aa:"飭",0x99ab:"勠",0x99ac:"勳",0x99ad:"勵",0x99ae:"勸",0x99af:"勹",0x99b0:"匆",0x99b1:"匈",0x99b2:"甸",0x99b3:"匍",0x99b4:"匐",0x99b5:"匏",0x99b6:"匕",0x99b7:"匚",0x99b8:"匣",0x99b9:"匯",0x99ba:"匱",0x99bb:"匳",0x99bc:"匸",0x99bd:"區",0x99be:"卆",0x99bf:"卅",0x99c0:"丗",0x99c1:"卉",0x99c2:"卍",0x99c3:"凖",0x99c4:"卞",0x99c5:"卩",0x99c6:"卮",0x99c7:"夘",0x99c8:"卻",0x99c9:"卷",0x99ca:"厂",0x99cb:"厖",0x99cc:"厠",0x99cd:"厦",0x99ce:"厥",0x99cf:"厮",0x99d0:"厰",0x99d1:"厶",0x99d2:"參",0x99d3:"簒",0x99d4:"雙",0x99d5:"叟",0x99d6:"曼",0x99d7:"燮",0x99d8:"叮",0x99d9:"叨",0x99da:"叭",0x99db:"叺",0x99dc:"吁",0x99dd:"吽",0x99de:"呀",0x99df:"听",0x99e0:"吭",0x99e1:"吼",0x99e2:"吮",0x99e3:"吶",0x99e4:"吩",0x99e5:"吝",0x99e6:"呎",0x99e7:"咏",0x99e8:"呵",0x99e9:"咎",0x99ea:"呟",0x99eb:"呱",0x99ec:"呷",0x99ed:"呰",0x99ee:"咒",0x99ef:"呻",0x99f0:"咀",0x99f1:"呶",0x99f2:"咄",0x99f3:"咐",0x99f4:"咆",0x99f5:"哇",0x99f6:"咢",0x99f7:"咸",0x99f8:"咥",0x99f9:"咬",0x99fa:"哄",0x99fb:"哈",0x99fc:"咨",0x9a40:"咫",0x9a41:"哂",0x9a42:"咤",0x9a43:"咾",0x9a44:"咼",0x9a45:"哘",0x9a46:"哥",0x9a47:"哦",0x9a48:"唏",0x9a49:"唔",0x9a4a:"哽",0x9a4b:"哮",0x9a4c:"哭",0x9a4d:"哺",0x9a4e:"哢",0x9a4f:"唹",0x9a50:"啀",0x9a51:"啣",0x9a52:"啌",0x9a53:"售",0x9a54:"啜",0x9a55:"啅",0x9a56:"啖",0x9a57:"啗",0x9a58:"唸",0x9a59:"唳",0x9a5a:"啝",0x9a5b:"喙",0x9a5c:"喀",0x9a5d:"咯",0x9a5e:"喊",0x9a5f:"喟",0x9a60:"啻",0x9a61:"啾",0x9a62:"喘",0x9a63:"喞",0x9a64:"單",0x9a65:"啼",0x9a66:"喃",0x9a67:"喩",0x9a68:"喇",0x9a69:"喨",0x9a6a:"嗚",0x9a6b:"嗅",0x9a6c:"嗟",0x9a6d:"嗄",0x9a6e:"嗜",0x9a6f:"嗤",0x9a70:"嗔",0x9a71:"嘔",0x9a72:"嗷",0x9a73:"嘖",0x9a74:"嗾",0x9a75:"嗽",0x9a76:"嘛",0x9a77:"嗹",0x9a78:"噎",0x9a79:"噐",0x9a7a:"營",0x9a7b:"嘴",0x9a7c:"嘶",0x9a7d:"嘲",0x9a7e:"嘸",0x9a80:"噫",0x9a81:"噤",0x9a82:"嘯",0x9a83:"噬",0x9a84:"噪",0x9a85:"嚆",0x9a86:"嚀",0x9a87:"嚊",0x9a88:"嚠",0x9a89:"嚔",0x9a8a:"嚏",0x9a8b:"嚥",0x9a8c:"嚮",0x9a8d:"嚶",0x9a8e:"嚴",0x9a8f:"囂",0x9a90:"嚼",0x9a91:"囁",0x9a92:"囃",0x9a93:"囀",0x9a94:"囈",0x9a95:"囎",0x9a96:"囑",0x9a97:"囓",0x9a98:"囗",0x9a99:"囮",0x9a9a:"囹",0x9a9b:"圀",0x9a9c:"囿",0x9a9d:"圄",0x9a9e:"圉",0x9a9f:"圈",0x9aa0:"國",0x9aa1:"圍",0x9aa2:"圓",0x9aa3:"團",0x9aa4:"圖",0x9aa5:"嗇",0x9aa6:"圜",0x9aa7:"圦",0x9aa8:"圷",0x9aa9:"圸",0x9aaa:"坎",0x9aab:"圻",0x9aac:"址",0x9aad:"坏",0x9aae:"坩",0x9aaf:"埀",0x9ab0:"垈",0x9ab1:"坡",0x9ab2:"坿",0x9ab3:"垉",0x9ab4:"垓",0x9ab5:"垠",0x9ab6:"垳",0x9ab7:"垤",0x9ab8:"垪",0x9ab9:"垰",0x9aba:"埃",0x9abb:"埆",0x9abc:"埔",0x9abd:"埒",0x9abe:"埓",0x9abf:"堊",0x9ac0:"埖",0x9ac1:"埣",0x9ac2:"堋",0x9ac3:"堙",0x9ac4:"堝",0x9ac5:"塲",0x9ac6:"堡",0x9ac7:"塢",0x9ac8:"塋",0x9ac9:"塰",0x9aca:"毀",0x9acb:"塒",0x9acc:"堽",0x9acd:"塹",0x9ace:"墅",0x9acf:"墹",0x9ad0:"墟",0x9ad1:"墫",0x9ad2:"墺",0x9ad3:"壞",0x9ad4:"墻",0x9ad5:"墸",0x9ad6:"墮",0x9ad7:"壅",0x9ad8:"壓",0x9ad9:"壑",0x9ada:"壗",0x9adb:"壙",0x9adc:"壘",0x9add:"壥",0x9ade:"壜",0x9adf:"壤",0x9ae0:"壟",0x9ae1:"壯",0x9ae2:"壺",0x9ae3:"壹",0x9ae4:"壻",0x9ae5:"壼",0x9ae6:"壽",0x9ae7:"夂",0x9ae8:"夊",0x9ae9:"夐",0x9aea:"夛",0x9aeb:"梦",0x9aec:"夥",0x9aed:"夬",0x9aee:"夭",0x9aef:"夲",0x9af0:"夸",0x9af1:"夾",0x9af2:"竒",0x9af3:"奕",0x9af4:"奐",0x9af5:"奎",0x9af6:"奚",0x9af7:"奘",0x9af8:"奢",0x9af9:"奠",0x9afa:"奧",0x9afb:"奬",0x9afc:"奩",0x9b40:"奸",0x9b41:"妁",0x9b42:"妝",0x9b43:"佞",0x9b44:"侫",0x9b45:"妣",0x9b46:"妲",0x9b47:"姆",0x9b48:"姨",0x9b49:"姜",0x9b4a:"妍",0x9b4b:"姙",0x9b4c:"姚",0x9b4d:"娥",0x9b4e:"娟",0x9b4f:"娑",0x9b50:"娜",0x9b51:"娉",0x9b52:"娚",0x9b53:"婀",0x9b54:"婬",0x9b55:"婉",0x9b56:"娵",0x9b57:"娶",0x9b58:"婢",0x9b59:"婪",0x9b5a:"媚",0x9b5b:"媼",0x9b5c:"媾",0x9b5d:"嫋",0x9b5e:"嫂",0x9b5f:"媽",0x9b60:"嫣",0x9b61:"嫗",0x9b62:"嫦",0x9b63:"嫩",0x9b64:"嫖",0x9b65:"嫺",0x9b66:"嫻",0x9b67:"嬌",0x9b68:"嬋",0x9b69:"嬖",0x9b6a:"嬲",0x9b6b:"嫐",0x9b6c:"嬪",0x9b6d:"嬶",0x9b6e:"嬾",0x9b6f:"孃",0x9b70:"孅",0x9b71:"孀",0x9b72:"孑",0x9b73:"孕",0x9b74:"孚",0x9b75:"孛",0x9b76:"孥",0x9b77:"孩",0x9b78:"孰",0x9b79:"孳",0x9b7a:"孵",0x9b7b:"學",0x9b7c:"斈",0x9b7d:"孺",0x9b7e:"宀",0x9b80:"它",0x9b81:"宦",0x9b82:"宸",0x9b83:"寃",0x9b84:"寇",0x9b85:"寉",0x9b86:"寔",0x9b87:"寐",0x9b88:"寤",0x9b89:"實",0x9b8a:"寢",0x9b8b:"寞",0x9b8c:"寥",0x9b8d:"寫",0x9b8e:"寰",0x9b8f:"寶",0x9b90:"寳",0x9b91:"尅",0x9b92:"將",0x9b93:"專",0x9b94:"對",0x9b95:"尓",0x9b96:"尠",0x9b97:"尢",0x9b98:"尨",0x9b99:"尸",0x9b9a:"尹",0x9b9b:"屁",0x9b9c:"屆",0x9b9d:"屎",0x9b9e:"屓",0x9b9f:"屐",0x9ba0:"屏",0x9ba1:"孱",0x9ba2:"屬",0x9ba3:"屮",0x9ba4:"乢",0x9ba5:"屶",0x9ba6:"屹",0x9ba7:"岌",0x9ba8:"岑",0x9ba9:"岔",0x9baa:"妛",0x9bab:"岫",0x9bac:"岻",0x9bad:"岶",0x9bae:"岼",0x9baf:"岷",0x9bb0:"峅",0x9bb1:"岾",0x9bb2:"峇",0x9bb3:"峙",0x9bb4:"峩",0x9bb5:"峽",0x9bb6:"峺",0x9bb7:"峭",0x9bb8:"嶌",0x9bb9:"峪",0x9bba:"崋",0x9bbb:"崕",0x9bbc:"崗",0x9bbd:"嵜",0x9bbe:"崟",0x9bbf:"崛",0x9bc0:"崑",0x9bc1:"崔",0x9bc2:"崢",0x9bc3:"崚",0x9bc4:"崙",0x9bc5:"崘",0x9bc6:"嵌",0x9bc7:"嵒",0x9bc8:"嵎",0x9bc9:"嵋",0x9bca:"嵬",0x9bcb:"嵳",0x9bcc:"嵶",0x9bcd:"嶇",0x9bce:"嶄",0x9bcf:"嶂",0x9bd0:"嶢",0x9bd1:"嶝",0x9bd2:"嶬",0x9bd3:"嶮",0x9bd4:"嶽",0x9bd5:"嶐",0x9bd6:"嶷",0x9bd7:"嶼",0x9bd8:"巉",0x9bd9:"巍",0x9bda:"巓",0x9bdb:"巒",0x9bdc:"巖",0x9bdd:"巛",0x9bde:"巫",0x9bdf:"已",0x9be0:"巵",0x9be1:"帋",0x9be2:"帚",0x9be3:"帙",0x9be4:"帑",0x9be5:"帛",0x9be6:"帶",0x9be7:"帷",0x9be8:"幄",0x9be9:"幃",0x9bea:"幀",0x9beb:"幎",0x9bec:"幗",0x9bed:"幔",0x9bee:"幟",0x9bef:"幢",0x9bf0:"幤",0x9bf1:"幇",0x9bf2:"幵",0x9bf3:"并",0x9bf4:"幺",0x9bf5:"麼",0x9bf6:"广",0x9bf7:"庠",0x9bf8:"廁",0x9bf9:"廂",0x9bfa:"廈",0x9bfb:"廐",0x9bfc:"廏",0x9c40:"廖",0x9c41:"廣",0x9c42:"廝",0x9c43:"廚",0x9c44:"廛",0x9c45:"廢",0x9c46:"廡",0x9c47:"廨",0x9c48:"廩",0x9c49:"廬",0x9c4a:"廱",0x9c4b:"廳",0x9c4c:"廰",0x9c4d:"廴",0x9c4e:"廸",0x9c4f:"廾",0x9c50:"弃",0x9c51:"弉",0x9c52:"彝",0x9c53:"彜",0x9c54:"弋",0x9c55:"弑",0x9c56:"弖",0x9c57:"弩",0x9c58:"弭",0x9c59:"弸",0x9c5a:"彁",0x9c5b:"彈",0x9c5c:"彌",0x9c5d:"彎",0x9c5e:"弯",0x9c5f:"彑",0x9c60:"彖",0x9c61:"彗",0x9c62:"彙",0x9c63:"彡",0x9c64:"彭",0x9c65:"彳",0x9c66:"彷",0x9c67:"徃",0x9c68:"徂",0x9c69:"彿",0x9c6a:"徊",0x9c6b:"很",0x9c6c:"徑",0x9c6d:"徇",0x9c6e:"從",0x9c6f:"徙",0x9c70:"徘",0x9c71:"徠",0x9c72:"徨",0x9c73:"徭",0x9c74:"徼",0x9c75:"忖",0x9c76:"忻",0x9c77:"忤",0x9c78:"忸",0x9c79:"忱",0x9c7a:"忝",0x9c7b:"悳",0x9c7c:"忿",0x9c7d:"怡",0x9c7e:"恠",0x9c80:"怙",0x9c81:"怐",0x9c82:"怩",0x9c83:"怎",0x9c84:"怱",0x9c85:"怛",0x9c86:"怕",0x9c87:"怫",0x9c88:"怦",0x9c89:"怏",0x9c8a:"怺",0x9c8b:"恚",0x9c8c:"恁",0x9c8d:"恪",0x9c8e:"恷",0x9c8f:"恟",0x9c90:"恊",0x9c91:"恆",0x9c92:"恍",0x9c93:"恣",0x9c94:"恃",0x9c95:"恤",0x9c96:"恂",0x9c97:"恬",0x9c98:"恫",0x9c99:"恙",0x9c9a:"悁",0x9c9b:"悍",0x9c9c:"惧",0x9c9d:"悃",0x9c9e:"悚",0x9c9f:"悄",0x9ca0:"悛",0x9ca1:"悖",0x9ca2:"悗",0x9ca3:"悒",0x9ca4:"悧",0x9ca5:"悋",0x9ca6:"惡",0x9ca7:"悸",0x9ca8:"惠",0x9ca9:"惓",0x9caa:"悴",0x9cab:"忰",0x9cac:"悽",0x9cad:"惆",0x9cae:"悵",0x9caf:"惘",0x9cb0:"慍",0x9cb1:"愕",0x9cb2:"愆",0x9cb3:"惶",0x9cb4:"惷",0x9cb5:"愀",0x9cb6:"惴",0x9cb7:"惺",0x9cb8:"愃",0x9cb9:"愡",0x9cba:"惻",0x9cbb:"惱",0x9cbc:"愍",0x9cbd:"愎",0x9cbe:"慇",0x9cbf:"愾",0x9cc0:"愨",0x9cc1:"愧",0x9cc2:"慊",0x9cc3:"愿",0x9cc4:"愼",0x9cc5:"愬",0x9cc6:"愴",0x9cc7:"愽",0x9cc8:"慂",0x9cc9:"慄",0x9cca:"慳",0x9ccb:"慷",0x9ccc:"慘",0x9ccd:"慙",0x9cce:"慚",0x9ccf:"慫",0x9cd0:"慴",0x9cd1:"慯",0x9cd2:"慥",0x9cd3:"慱",0x9cd4:"慟",0x9cd5:"慝",0x9cd6:"慓",0x9cd7:"慵",0x9cd8:"憙",0x9cd9:"憖",0x9cda:"憇",0x9cdb:"憬",0x9cdc:"憔",0x9cdd:"憚",0x9cde:"憊",0x9cdf:"憑",0x9ce0:"憫",0x9ce1:"憮",0x9ce2:"懌",0x9ce3:"懊",0x9ce4:"應",0x9ce5:"懷",0x9ce6:"懈",0x9ce7:"懃",0x9ce8:"懆",0x9ce9:"憺",0x9cea:"懋",0x9ceb:"罹",0x9cec:"懍",0x9ced:"懦",0x9cee:"懣",0x9cef:"懶",0x9cf0:"懺",0x9cf1:"懴",0x9cf2:"懿",0x9cf3:"懽",0x9cf4:"懼",0x9cf5:"懾",0x9cf6:"戀",0x9cf7:"戈",0x9cf8:"戉",0x9cf9:"戍",0x9cfa:"戌",0x9cfb:"戔",0x9cfc:"戛",0x9d40:"戞",0x9d41:"戡",0x9d42:"截",0x9d43:"戮",0x9d44:"戰",0x9d45:"戲",0x9d46:"戳",0x9d47:"扁",0x9d48:"扎",0x9d49:"扞",0x9d4a:"扣",0x9d4b:"扛",0x9d4c:"扠",0x9d4d:"扨",0x9d4e:"扼",0x9d4f:"抂",0x9d50:"抉",0x9d51:"找",0x9d52:"抒",0x9d53:"抓",0x9d54:"抖",0x9d55:"拔",0x9d56:"抃",0x9d57:"抔",0x9d58:"拗",0x9d59:"拑",0x9d5a:"抻",0x9d5b:"拏",0x9d5c:"拿",0x9d5d:"拆",0x9d5e:"擔",0x9d5f:"拈",0x9d60:"拜",0x9d61:"拌",0x9d62:"拊",0x9d63:"拂",0x9d64:"拇",0x9d65:"抛",0x9d66:"拉",0x9d67:"挌",0x9d68:"拮",0x9d69:"拱",0x9d6a:"挧",0x9d6b:"挂",0x9d6c:"挈",0x9d6d:"拯",0x9d6e:"拵",0x9d6f:"捐",0x9d70:"挾",0x9d71:"捍",0x9d72:"搜",0x9d73:"捏",0x9d74:"掖",0x9d75:"掎",0x9d76:"掀",0x9d77:"掫",0x9d78:"捶",0x9d79:"掣",0x9d7a:"掏",0x9d7b:"掉",0x9d7c:"掟",0x9d7d:"掵",0x9d7e:"捫",0x9d80:"捩",0x9d81:"掾",0x9d82:"揩",0x9d83:"揀",0x9d84:"揆",0x9d85:"揣",0x9d86:"揉",0x9d87:"插",0x9d88:"揶",0x9d89:"揄",0x9d8a:"搖",0x9d8b:"搴",0x9d8c:"搆",0x9d8d:"搓",0x9d8e:"搦",0x9d8f:"搶",0x9d90:"攝",0x9d91:"搗",0x9d92:"搨",0x9d93:"搏",0x9d94:"摧",0x9d95:"摯",0x9d96:"摶",0x9d97:"摎",0x9d98:"攪",0x9d99:"撕",0x9d9a:"撓",0x9d9b:"撥",0x9d9c:"撩",0x9d9d:"撈",0x9d9e:"撼",0x9d9f:"據",0x9da0:"擒",0x9da1:"擅",0x9da2:"擇",0x9da3:"撻",0x9da4:"擘",0x9da5:"擂",0x9da6:"擱",0x9da7:"擧",0x9da8:"舉",0x9da9:"擠",0x9daa:"擡",0x9dab:"抬",0x9dac:"擣",0x9dad:"擯",0x9dae:"攬",0x9daf:"擶",0x9db0:"擴",0x9db1:"擲",0x9db2:"擺",0x9db3:"攀",0x9db4:"擽",0x9db5:"攘",0x9db6:"攜",0x9db7:"攅",0x9db8:"攤",0x9db9:"攣",0x9dba:"攫",0x9dbb:"攴",0x9dbc:"攵",0x9dbd:"攷",0x9dbe:"收",0x9dbf:"攸",0x9dc0:"畋",0x9dc1:"效",0x9dc2:"敖",0x9dc3:"敕",0x9dc4:"敍",0x9dc5:"敘",0x9dc6:"敞",0x9dc7:"敝",0x9dc8:"敲",0x9dc9:"數",0x9dca:"斂",0x9dcb:"斃",0x9dcc:"變",0x9dcd:"斛",0x9dce:"斟",0x9dcf:"斫",0x9dd0:"斷",0x9dd1:"旃",0x9dd2:"旆",0x9dd3:"旁",0x9dd4:"旄",0x9dd5:"旌",0x9dd6:"旒",0x9dd7:"旛",0x9dd8:"旙",0x9dd9:"无",0x9dda:"旡",0x9ddb:"旱",0x9ddc:"杲",0x9ddd:"昊",0x9dde:"昃",0x9ddf:"旻",0x9de0:"杳",0x9de1:"昵",0x9de2:"昶",0x9de3:"昴",0x9de4:"昜",0x9de5:"晏",0x9de6:"晄",0x9de7:"晉",0x9de8:"晁",0x9de9:"晞",0x9dea:"晝",0x9deb:"晤",0x9dec:"晧",0x9ded:"晨",0x9dee:"晟",0x9def:"晢",0x9df0:"晰",0x9df1:"暃",0x9df2:"暈",0x9df3:"暎",0x9df4:"暉",0x9df5:"暄",0x9df6:"暘",0x9df7:"暝",0x9df8:"曁",0x9df9:"暹",0x9dfa:"曉",0x9dfb:"暾",0x9dfc:"暼",0x9e40:"曄",0x9e41:"暸",0x9e42:"曖",0x9e43:"曚",0x9e44:"曠",0x9e45:"昿",0x9e46:"曦",0x9e47:"曩",0x9e48:"曰",0x9e49:"曵",0x9e4a:"曷",0x9e4b:"朏",0x9e4c:"朖",0x9e4d:"朞",0x9e4e:"朦",0x9e4f:"朧",0x9e50:"霸",0x9e51:"朮",0x9e52:"朿",0x9e53:"朶",0x9e54:"杁",0x9e55:"朸",0x9e56:"朷",0x9e57:"杆",0x9e58:"杞",0x9e59:"杠",0x9e5a:"杙",0x9e5b:"杣",0x9e5c:"杤",0x9e5d:"枉",0x9e5e:"杰",0x9e5f:"枩",0x9e60:"杼",0x9e61:"杪",0x9e62:"枌",0x9e63:"枋",0x9e64:"枦",0x9e65:"枡",0x9e66:"枅",0x9e67:"枷",0x9e68:"柯",0x9e69:"枴",0x9e6a:"柬",0x9e6b:"枳",0x9e6c:"柩",0x9e6d:"枸",0x9e6e:"柤",0x9e6f:"柞",0x9e70:"柝",0x9e71:"柢",0x9e72:"柮",0x9e73:"枹",0x9e74:"柎",0x9e75:"柆",0x9e76:"柧",0x9e77:"檜",0x9e78:"栞",0x9e79:"框",0x9e7a:"栩",0x9e7b:"桀",0x9e7c:"桍",0x9e7d:"栲",0x9e7e:"桎",0x9e80:"梳",0x9e81:"栫",0x9e82:"桙",0x9e83:"档",0x9e84:"桷",0x9e85:"桿",0x9e86:"梟",0x9e87:"梏",0x9e88:"梭",0x9e89:"梔",0x9e8a:"條",0x9e8b:"梛",0x9e8c:"梃",0x9e8d:"檮",0x9e8e:"梹",0x9e8f:"桴",0x9e90:"梵",0x9e91:"梠",0x9e92:"梺",0x9e93:"椏",0x9e94:"梍",0x9e95:"桾",0x9e96:"椁",0x9e97:"棊",0x9e98:"椈",0x9e99:"棘",0x9e9a:"椢",0x9e9b:"椦",0x9e9c:"棡",0x9e9d:"椌",0x9e9e:"棍",0x9e9f:"棔",0x9ea0:"棧",0x9ea1:"棕",0x9ea2:"椶",0x9ea3:"椒",0x9ea4:"椄",0x9ea5:"棗",0x9ea6:"棣",0x9ea7:"椥",0x9ea8:"棹",0x9ea9:"棠",0x9eaa:"棯",0x9eab:"椨",0x9eac:"椪",0x9ead:"椚",0x9eae:"椣",0x9eaf:"椡",0x9eb0:"棆",0x9eb1:"楹",0x9eb2:"楷",0x9eb3:"楜",0x9eb4:"楸",0x9eb5:"楫",0x9eb6:"楔",0x9eb7:"楾",0x9eb8:"楮",0x9eb9:"椹",0x9eba:"楴",0x9ebb:"椽",0x9ebc:"楙",0x9ebd:"椰",0x9ebe:"楡",0x9ebf:"楞",0x9ec0:"楝",0x9ec1:"榁",0x9ec2:"楪",0x9ec3:"榲",0x9ec4:"榮",0x9ec5:"槐",0x9ec6:"榿",0x9ec7:"槁",0x9ec8:"槓",0x9ec9:"榾",0x9eca:"槎",0x9ecb:"寨",0x9ecc:"槊",0x9ecd:"槝",0x9ece:"榻",0x9ecf:"槃",0x9ed0:"榧",0x9ed1:"樮",0x9ed2:"榑",0x9ed3:"榠",0x9ed4:"榜",0x9ed5:"榕",0x9ed6:"榴",0x9ed7:"槞",0x9ed8:"槨",0x9ed9:"樂",0x9eda:"樛",0x9edb:"槿",0x9edc:"權",0x9edd:"槹",0x9ede:"槲",0x9edf:"槧",0x9ee0:"樅",0x9ee1:"榱",0x9ee2:"樞",0x9ee3:"槭",0x9ee4:"樔",0x9ee5:"槫",0x9ee6:"樊",0x9ee7:"樒",0x9ee8:"櫁",0x9ee9:"樣",0x9eea:"樓",0x9eeb:"橄",0x9eec:"樌",0x9eed:"橲",0x9eee:"樶",0x9eef:"橸",0x9ef0:"橇",0x9ef1:"橢",0x9ef2:"橙",0x9ef3:"橦",0x9ef4:"橈",0x9ef5:"樸",0x9ef6:"樢",0x9ef7:"檐",0x9ef8:"檍",0x9ef9:"檠",0x9efa:"檄",0x9efb:"檢",0x9efc:"檣",0x9f40:"檗",0x9f41:"蘗",0x9f42:"檻",0x9f43:"櫃",0x9f44:"櫂",0x9f45:"檸",0x9f46:"檳",0x9f47:"檬",0x9f48:"櫞",0x9f49:"櫑",0x9f4a:"櫟",0x9f4b:"檪",0x9f4c:"櫚",0x9f4d:"櫪",0x9f4e:"櫻",0x9f4f:"欅",0x9f50:"蘖",0x9f51:"櫺",0x9f52:"欒",0x9f53:"欖",0x9f54:"鬱",0x9f55:"欟",0x9f56:"欸",0x9f57:"欷",0x9f58:"盜",0x9f59:"欹",0x9f5a:"飮",0x9f5b:"歇",0x9f5c:"歃",0x9f5d:"歉",0x9f5e:"歐",0x9f5f:"歙",0x9f60:"歔",0x9f61:"歛",0x9f62:"歟",0x9f63:"歡",0x9f64:"歸",0x9f65:"歹",0x9f66:"歿",0x9f67:"殀",0x9f68:"殄",0x9f69:"殃",0x9f6a:"殍",0x9f6b:"殘",0x9f6c:"殕",0x9f6d:"殞",0x9f6e:"殤",0x9f6f:"殪",0x9f70:"殫",0x9f71:"殯",0x9f72:"殲",0x9f73:"殱",0x9f74:"殳",0x9f75:"殷",0x9f76:"殼",0x9f77:"毆",0x9f78:"毋",0x9f79:"毓",0x9f7a:"毟",0x9f7b:"毬",0x9f7c:"毫",0x9f7d:"毳",0x9f7e:"毯",0x9f80:"麾",0x9f81:"氈",0x9f82:"氓",0x9f83:"气",0x9f84:"氛",0x9f85:"氤",0x9f86:"氣",0x9f87:"汞",0x9f88:"汕",0x9f89:"汢",0x9f8a:"汪",0x9f8b:"沂",0x9f8c:"沍",0x9f8d:"沚",0x9f8e:"沁",0x9f8f:"沛",0x9f90:"汾",0x9f91:"汨",0x9f92:"汳",0x9f93:"沒",0x9f94:"沐",0x9f95:"泄",0x9f96:"泱",0x9f97:"泓",0x9f98:"沽",0x9f99:"泗",0x9f9a:"泅",0x9f9b:"泝",0x9f9c:"沮",0x9f9d:"沱",0x9f9e:"沾",0x9f9f:"沺",0x9fa0:"泛",0x9fa1:"泯",0x9fa2:"泙",0x9fa3:"泪",0x9fa4:"洟",0x9fa5:"衍",0x9fa6:"洶",0x9fa7:"洫",0x9fa8:"洽",0x9fa9:"洸",0x9faa:"洙",0x9fab:"洵",0x9fac:"洳",0x9fad:"洒",0x9fae:"洌",0x9faf:"浣",0x9fb0:"涓",0x9fb1:"浤",0x9fb2:"浚",0x9fb3:"浹",0x9fb4:"浙",0x9fb5:"涎",0x9fb6:"涕",0x9fb7:"濤",0x9fb8:"涅",0x9fb9:"淹",0x9fba:"渕",0x9fbb:"渊",0x9fbc:"涵",0x9fbd:"淇",0x9fbe:"淦",0x9fbf:"涸",0x9fc0:"淆",0x9fc1:"淬",0x9fc2:"淞",0x9fc3:"淌",0x9fc4:"淨",0x9fc5:"淒",0x9fc6:"淅",0x9fc7:"淺",0x9fc8:"淙",0x9fc9:"淤",0x9fca:"淕",0x9fcb:"淪",0x9fcc:"淮",0x9fcd:"渭",0x9fce:"湮",0x9fcf:"渮",0x9fd0:"渙",0x9fd1:"湲",0x9fd2:"湟",0x9fd3:"渾",0x9fd4:"渣",0x9fd5:"湫",0x9fd6:"渫",0x9fd7:"湶",0x9fd8:"湍",0x9fd9:"渟",0x9fda:"湃",0x9fdb:"渺",0x9fdc:"湎",0x9fdd:"渤",0x9fde:"滿",0x9fdf:"渝",0x9fe0:"游",0x9fe1:"溂",0x9fe2:"溪",0x9fe3:"溘",0x9fe4:"滉",0x9fe5:"溷",0x9fe6:"滓",0x9fe7:"溽",0x9fe8:"溯",0x9fe9:"滄",0x9fea:"溲",0x9feb:"滔",0x9fec:"滕",0x9fed:"溏",0x9fee:"溥",0x9fef:"滂",0x9ff0:"溟",0x9ff1:"潁",0x9ff2:"漑",0x9ff3:"灌",0x9ff4:"滬",0x9ff5:"滸",0x9ff6:"滾",0x9ff7:"漿",0x9ff8:"滲",0x9ff9:"漱",0x9ffa:"滯",0x9ffb:"漲",0x9ffc:"滌",0xe040:"漾",0xe041:"漓",0xe042:"滷",0xe043:"澆",0xe044:"潺",0xe045:"潸",0xe046:"澁",0xe047:"澀",0xe048:"潯",0xe049:"潛",0xe04a:"濳",0xe04b:"潭",0xe04c:"澂",0xe04d:"潼",0xe04e:"潘",0xe04f:"澎",0xe050:"澑",0xe051:"濂",0xe052:"潦",0xe053:"澳",0xe054:"澣",0xe055:"澡",0xe056:"澤",0xe057:"澹",0xe058:"濆",0xe059:"澪",0xe05a:"濟",0xe05b:"濕",0xe05c:"濬",0xe05d:"濔",0xe05e:"濘",0xe05f:"濱",0xe060:"濮",0xe061:"濛",0xe062:"瀉",0xe063:"瀋",0xe064:"濺",0xe065:"瀑",0xe066:"瀁",0xe067:"瀏",0xe068:"濾",0xe069:"瀛",0xe06a:"瀚",0xe06b:"潴",0xe06c:"瀝",0xe06d:"瀘",0xe06e:"瀟",0xe06f:"瀰",0xe070:"瀾",0xe071:"瀲",0xe072:"灑",0xe073:"灣",0xe074:"炙",0xe075:"炒",0xe076:"炯",0xe077:"烱",0xe078:"炬",0xe079:"炸",0xe07a:"炳",0xe07b:"炮",0xe07c:"烟",0xe07d:"烋",0xe07e:"烝",0xe080:"烙",0xe081:"焉",0xe082:"烽",0xe083:"焜",0xe084:"焙",0xe085:"煥",0xe086:"煕",0xe087:"熈",0xe088:"煦",0xe089:"煢",0xe08a:"煌",0xe08b:"煖",0xe08c:"煬",0xe08d:"熏",0xe08e:"燻",0xe08f:"熄",0xe090:"熕",0xe091:"熨",0xe092:"熬",0xe093:"燗",0xe094:"熹",0xe095:"熾",0xe096:"燒",0xe097:"燉",0xe098:"燔",0xe099:"燎",0xe09a:"燠",0xe09b:"燬",0xe09c:"燧",0xe09d:"燵",0xe09e:"燼",0xe09f:"燹",0xe0a0:"燿",0xe0a1:"爍",0xe0a2:"爐",0xe0a3:"爛",0xe0a4:"爨",0xe0a5:"爭",0xe0a6:"爬",0xe0a7:"爰",0xe0a8:"爲",0xe0a9:"爻",0xe0aa:"爼",0xe0ab:"爿",0xe0ac:"牀",0xe0ad:"牆",0xe0ae:"牋",0xe0af:"牘",0xe0b0:"牴",0xe0b1:"牾",0xe0b2:"犂",0xe0b3:"犁",0xe0b4:"犇",0xe0b5:"犒",0xe0b6:"犖",0xe0b7:"犢",0xe0b8:"犧",0xe0b9:"犹",0xe0ba:"犲",0xe0bb:"狃",0xe0bc:"狆",0xe0bd:"狄",0xe0be:"狎",0xe0bf:"狒",0xe0c0:"狢",0xe0c1:"狠",0xe0c2:"狡",0xe0c3:"狹",0xe0c4:"狷",0xe0c5:"倏",0xe0c6:"猗",0xe0c7:"猊",0xe0c8:"猜",0xe0c9:"猖",0xe0ca:"猝",0xe0cb:"猴",0xe0cc:"猯",0xe0cd:"猩",0xe0ce:"猥",0xe0cf:"猾",0xe0d0:"獎",0xe0d1:"獏",0xe0d2:"默",0xe0d3:"獗",0xe0d4:"獪",0xe0d5:"獨",0xe0d6:"獰",0xe0d7:"獸",0xe0d8:"獵",0xe0d9:"獻",0xe0da:"獺",0xe0db:"珈",0xe0dc:"玳",0xe0dd:"珎",0xe0de:"玻",0xe0df:"珀",0xe0e0:"珥",0xe0e1:"珮",0xe0e2:"珞",0xe0e3:"璢",0xe0e4:"琅",0xe0e5:"瑯",0xe0e6:"琥",0xe0e7:"珸",0xe0e8:"琲",0xe0e9:"琺",0xe0ea:"瑕",0xe0eb:"琿",0xe0ec:"瑟",0xe0ed:"瑙",0xe0ee:"瑁",0xe0ef:"瑜",0xe0f0:"瑩",0xe0f1:"瑰",0xe0f2:"瑣",0xe0f3:"瑪",0xe0f4:"瑶",0xe0f5:"瑾",0xe0f6:"璋",0xe0f7:"璞",0xe0f8:"璧",0xe0f9:"瓊",0xe0fa:"瓏",0xe0fb:"瓔",0xe0fc:"珱",0xe140:"瓠",0xe141:"瓣",0xe142:"瓧",0xe143:"瓩",0xe144:"瓮",0xe145:"瓲",0xe146:"瓰",0xe147:"瓱",0xe148:"瓸",0xe149:"瓷",0xe14a:"甄",0xe14b:"甃",0xe14c:"甅",0xe14d:"甌",0xe14e:"甎",0xe14f:"甍",0xe150:"甕",0xe151:"甓",0xe152:"甞",0xe153:"甦",0xe154:"甬",0xe155:"甼",0xe156:"畄",0xe157:"畍",0xe158:"畊",0xe159:"畉",0xe15a:"畛",0xe15b:"畆",0xe15c:"畚",0xe15d:"畩",0xe15e:"畤",0xe15f:"畧",0xe160:"畫",0xe161:"畭",0xe162:"畸",0xe163:"當",0xe164:"疆",0xe165:"疇",0xe166:"畴",0xe167:"疊",0xe168:"疉",0xe169:"疂",0xe16a:"疔",0xe16b:"疚",0xe16c:"疝",0xe16d:"疥",0xe16e:"疣",0xe16f:"痂",0xe170:"疳",0xe171:"痃",0xe172:"疵",0xe173:"疽",0xe174:"疸",0xe175:"疼",0xe176:"疱",0xe177:"痍",0xe178:"痊",0xe179:"痒",0xe17a:"痙",0xe17b:"痣",0xe17c:"痞",0xe17d:"痾",0xe17e:"痿",0xe180:"痼",0xe181:"瘁",0xe182:"痰",0xe183:"痺",0xe184:"痲",0xe185:"痳",0xe186:"瘋",0xe187:"瘍",0xe188:"瘉",0xe189:"瘟",0xe18a:"瘧",0xe18b:"瘠",0xe18c:"瘡",0xe18d:"瘢",0xe18e:"瘤",0xe18f:"瘴",0xe190:"瘰",0xe191:"瘻",0xe192:"癇",0xe193:"癈",0xe194:"癆",0xe195:"癜",0xe196:"癘",0xe197:"癡",0xe198:"癢",0xe199:"癨",0xe19a:"癩",0xe19b:"癪",0xe19c:"癧",0xe19d:"癬",0xe19e:"癰",0xe19f:"癲",0xe1a0:"癶",0xe1a1:"癸",0xe1a2:"發",0xe1a3:"皀",0xe1a4:"皃",0xe1a5:"皈",0xe1a6:"皋",0xe1a7:"皎",0xe1a8:"皖",0xe1a9:"皓",0xe1aa:"皙",0xe1ab:"皚",0xe1ac:"皰",0xe1ad:"皴",0xe1ae:"皸",0xe1af:"皹",0xe1b0:"皺",0xe1b1:"盂",0xe1b2:"盍",0xe1b3:"盖",0xe1b4:"盒",0xe1b5:"盞",0xe1b6:"盡",0xe1b7:"盥",0xe1b8:"盧",0xe1b9:"盪",0xe1ba:"蘯",0xe1bb:"盻",0xe1bc:"眈",0xe1bd:"眇",0xe1be:"眄",0xe1bf:"眩",0xe1c0:"眤",0xe1c1:"眞",0xe1c2:"眥",0xe1c3:"眦",0xe1c4:"眛",0xe1c5:"眷",0xe1c6:"眸",0xe1c7:"睇",0xe1c8:"睚",0xe1c9:"睨",0xe1ca:"睫",0xe1cb:"睛",0xe1cc:"睥",0xe1cd:"睿",0xe1ce:"睾",0xe1cf:"睹",0xe1d0:"瞎",0xe1d1:"瞋",0xe1d2:"瞑",0xe1d3:"瞠",0xe1d4:"瞞",0xe1d5:"瞰",0xe1d6:"瞶",0xe1d7:"瞹",0xe1d8:"瞿",0xe1d9:"瞼",0xe1da:"瞽",0xe1db:"瞻",0xe1dc:"矇",0xe1dd:"矍",0xe1de:"矗",0xe1df:"矚",0xe1e0:"矜",0xe1e1:"矣",0xe1e2:"矮",0xe1e3:"矼",0xe1e4:"砌",0xe1e5:"砒",0xe1e6:"礦",0xe1e7:"砠",0xe1e8:"礪",0xe1e9:"硅",0xe1ea:"碎",0xe1eb:"硴",0xe1ec:"碆",0xe1ed:"硼",0xe1ee:"碚",0xe1ef:"碌",0xe1f0:"碣",0xe1f1:"碵",0xe1f2:"碪",0xe1f3:"碯",0xe1f4:"磑",0xe1f5:"磆",0xe1f6:"磋",0xe1f7:"磔",0xe1f8:"碾",0xe1f9:"碼",0xe1fa:"磅",0xe1fb:"磊",0xe1fc:"磬",0xe240:"磧",0xe241:"磚",0xe242:"磽",0xe243:"磴",0xe244:"礇",0xe245:"礒",0xe246:"礑",0xe247:"礙",0xe248:"礬",0xe249:"礫",0xe24a:"祀",0xe24b:"祠",0xe24c:"祗",0xe24d:"祟",0xe24e:"祚",0xe24f:"祕",0xe250:"祓",0xe251:"祺",0xe252:"祿",0xe253:"禊",0xe254:"禝",0xe255:"禧",0xe256:"齋",0xe257:"禪",0xe258:"禮",0xe259:"禳",0xe25a:"禹",0xe25b:"禺",0xe25c:"秉",0xe25d:"秕",0xe25e:"秧",0xe25f:"秬",0xe260:"秡",0xe261:"秣",0xe262:"稈",0xe263:"稍",0xe264:"稘",0xe265:"稙",0xe266:"稠",0xe267:"稟",0xe268:"禀",0xe269:"稱",0xe26a:"稻",0xe26b:"稾",0xe26c:"稷",0xe26d:"穃",0xe26e:"穗",0xe26f:"穉",0xe270:"穡",0xe271:"穢",0xe272:"穩",0xe273:"龝",0xe274:"穰",0xe275:"穹",0xe276:"穽",0xe277:"窈",0xe278:"窗",0xe279:"窕",0xe27a:"窘",0xe27b:"窖",0xe27c:"窩",0xe27d:"竈",0xe27e:"窰",0xe280:"窶",0xe281:"竅",0xe282:"竄",0xe283:"窿",0xe284:"邃",0xe285:"竇",0xe286:"竊",0xe287:"竍",0xe288:"竏",0xe289:"竕",0xe28a:"竓",0xe28b:"站",0xe28c:"竚",0xe28d:"竝",0xe28e:"竡",0xe28f:"竢",0xe290:"竦",0xe291:"竭",0xe292:"竰",0xe293:"笂",0xe294:"笏",0xe295:"笊",0xe296:"笆",0xe297:"笳",0xe298:"笘",0xe299:"笙",0xe29a:"笞",0xe29b:"笵",0xe29c:"笨",0xe29d:"笶",0xe29e:"筐",0xe29f:"筺",0xe2a0:"笄",0xe2a1:"筍",0xe2a2:"笋",0xe2a3:"筌",0xe2a4:"筅",0xe2a5:"筵",0xe2a6:"筥",0xe2a7:"筴",0xe2a8:"筧",0xe2a9:"筰",0xe2aa:"筱",0xe2ab:"筬",0xe2ac:"筮",0xe2ad:"箝",0xe2ae:"箘",0xe2af:"箟",0xe2b0:"箍",0xe2b1:"箜",0xe2b2:"箚",0xe2b3:"箋",0xe2b4:"箒",0xe2b5:"箏",0xe2b6:"筝",0xe2b7:"箙",0xe2b8:"篋",0xe2b9:"篁",0xe2ba:"篌",0xe2bb:"篏",0xe2bc:"箴",0xe2bd:"篆",0xe2be:"篝",0xe2bf:"篩",0xe2c0:"簑",0xe2c1:"簔",0xe2c2:"篦",0xe2c3:"篥",0xe2c4:"籠",0xe2c5:"簀",0xe2c6:"簇",0xe2c7:"簓",0xe2c8:"篳",0xe2c9:"篷",0xe2ca:"簗",0xe2cb:"簍",0xe2cc:"篶",0xe2cd:"簣",0xe2ce:"簧",0xe2cf:"簪",0xe2d0:"簟",0xe2d1:"簷",0xe2d2:"簫",0xe2d3:"簽",0xe2d4:"籌",0xe2d5:"籃",0xe2d6:"籔",0xe2d7:"籏",0xe2d8:"籀",0xe2d9:"籐",0xe2da:"籘",0xe2db:"籟",0xe2dc:"籤",0xe2dd:"籖",0xe2de:"籥",0xe2df:"籬",0xe2e0:"籵",0xe2e1:"粃",0xe2e2:"粐",0xe2e3:"粤",0xe2e4:"粭",0xe2e5:"粢",0xe2e6:"粫",0xe2e7:"粡",0xe2e8:"粨",0xe2e9:"粳",0xe2ea:"粲",0xe2eb:"粱",0xe2ec:"粮",0xe2ed:"粹",0xe2ee:"粽",0xe2ef:"糀",0xe2f0:"糅",0xe2f1:"糂",0xe2f2:"糘",0xe2f3:"糒",0xe2f4:"糜",0xe2f5:"糢",0xe2f6:"鬻",0xe2f7:"糯",0xe2f8:"糲",0xe2f9:"糴",0xe2fa:"糶",0xe2fb:"糺",0xe2fc:"紆",0xe340:"紂",0xe341:"紜",0xe342:"紕",0xe343:"紊",0xe344:"絅",0xe345:"絋",0xe346:"紮",0xe347:"紲",0xe348:"紿",0xe349:"紵",0xe34a:"絆",0xe34b:"絳",0xe34c:"絖",0xe34d:"絎",0xe34e:"絲",0xe34f:"絨",0xe350:"絮",0xe351:"絏",0xe352:"絣",0xe353:"經",0xe354:"綉",0xe355:"絛",0xe356:"綏",0xe357:"絽",0xe358:"綛",0xe359:"綺",0xe35a:"綮",0xe35b:"綣",0xe35c:"綵",0xe35d:"緇",0xe35e:"綽",0xe35f:"綫",0xe360:"總",0xe361:"綢",0xe362:"綯",0xe363:"緜",0xe364:"綸",0xe365:"綟",0xe366:"綰",0xe367:"緘",0xe368:"緝",0xe369:"緤",0xe36a:"緞",0xe36b:"緻",0xe36c:"緲",0xe36d:"緡",0xe36e:"縅",0xe36f:"縊",0xe370:"縣",0xe371:"縡",0xe372:"縒",0xe373:"縱",0xe374:"縟",0xe375:"縉",0xe376:"縋",0xe377:"縢",0xe378:"繆",0xe379:"繦",0xe37a:"縻",0xe37b:"縵",0xe37c:"縹",0xe37d:"繃",0xe37e:"縷",0xe380:"縲",0xe381:"縺",0xe382:"繧",0xe383:"繝",0xe384:"繖",0xe385:"繞",0xe386:"繙",0xe387:"繚",0xe388:"繹",0xe389:"繪",0xe38a:"繩",0xe38b:"繼",0xe38c:"繻",0xe38d:"纃",0xe38e:"緕",0xe38f:"繽",0xe390:"辮",0xe391:"繿",0xe392:"纈",0xe393:"纉",0xe394:"續",0xe395:"纒",0xe396:"纐",0xe397:"纓",0xe398:"纔",0xe399:"纖",0xe39a:"纎",0xe39b:"纛",0xe39c:"纜",0xe39d:"缸",0xe39e:"缺",0xe39f:"罅",0xe3a0:"罌",0xe3a1:"罍",0xe3a2:"罎",0xe3a3:"罐",0xe3a4:"网",0xe3a5:"罕",0xe3a6:"罔",0xe3a7:"罘",0xe3a8:"罟",0xe3a9:"罠",0xe3aa:"罨",0xe3ab:"罩",0xe3ac:"罧",0xe3ad:"罸",0xe3ae:"羂",0xe3af:"羆",0xe3b0:"羃",0xe3b1:"羈",0xe3b2:"羇",0xe3b3:"羌",0xe3b4:"羔",0xe3b5:"羞",0xe3b6:"羝",0xe3b7:"羚",0xe3b8:"羣",0xe3b9:"羯",0xe3ba:"羲",0xe3bb:"羹",0xe3bc:"羮",0xe3bd:"羶",0xe3be:"羸",0xe3bf:"譱",0xe3c0:"翅",0xe3c1:"翆",0xe3c2:"翊",0xe3c3:"翕",0xe3c4:"翔",0xe3c5:"翡",0xe3c6:"翦",0xe3c7:"翩",0xe3c8:"翳",0xe3c9:"翹",0xe3ca:"飜",0xe3cb:"耆",0xe3cc:"耄",0xe3cd:"耋",0xe3ce:"耒",0xe3cf:"耘",0xe3d0:"耙",0xe3d1:"耜",0xe3d2:"耡",0xe3d3:"耨",0xe3d4:"耿",0xe3d5:"耻",0xe3d6:"聊",0xe3d7:"聆",0xe3d8:"聒",0xe3d9:"聘",0xe3da:"聚",0xe3db:"聟",0xe3dc:"聢",0xe3dd:"聨",0xe3de:"聳",0xe3df:"聲",0xe3e0:"聰",0xe3e1:"聶",0xe3e2:"聹",0xe3e3:"聽",0xe3e4:"聿",0xe3e5:"肄",0xe3e6:"肆",0xe3e7:"肅",0xe3e8:"肛",0xe3e9:"肓",0xe3ea:"肚",0xe3eb:"肭",0xe3ec:"冐",0xe3ed:"肬",0xe3ee:"胛",0xe3ef:"胥",0xe3f0:"胙",0xe3f1:"胝",0xe3f2:"胄",0xe3f3:"胚",0xe3f4:"胖",0xe3f5:"脉",0xe3f6:"胯",0xe3f7:"胱",0xe3f8:"脛",0xe3f9:"脩",0xe3fa:"脣",0xe3fb:"脯",0xe3fc:"腋",0xe440:"隋",0xe441:"腆",0xe442:"脾",0xe443:"腓",0xe444:"腑",0xe445:"胼",0xe446:"腱",0xe447:"腮",0xe448:"腥",0xe449:"腦",0xe44a:"腴",0xe44b:"膃",0xe44c:"膈",0xe44d:"膊",0xe44e:"膀",0xe44f:"膂",0xe450:"膠",0xe451:"膕",0xe452:"膤",0xe453:"膣",0xe454:"腟",0xe455:"膓",0xe456:"膩",0xe457:"膰",0xe458:"膵",0xe459:"膾",0xe45a:"膸",0xe45b:"膽",0xe45c:"臀",0xe45d:"臂",0xe45e:"膺",0xe45f:"臉",0xe460:"臍",0xe461:"臑",0xe462:"臙",0xe463:"臘",0xe464:"臈",0xe465:"臚",0xe466:"臟",0xe467:"臠",0xe468:"臧",0xe469:"臺",0xe46a:"臻",0xe46b:"臾",0xe46c:"舁",0xe46d:"舂",0xe46e:"舅",0xe46f:"與",0xe470:"舊",0xe471:"舍",0xe472:"舐",0xe473:"舖",0xe474:"舩",0xe475:"舫",0xe476:"舸",0xe477:"舳",0xe478:"艀",0xe479:"艙",0xe47a:"艘",0xe47b:"艝",0xe47c:"艚",0xe47d:"艟",0xe47e:"艤",0xe480:"艢",0xe481:"艨",0xe482:"艪",0xe483:"艫",0xe484:"舮",0xe485:"艱",0xe486:"艷",0xe487:"艸",0xe488:"艾",0xe489:"芍",0xe48a:"芒",0xe48b:"芫",0xe48c:"芟",0xe48d:"芻",0xe48e:"芬",0xe48f:"苡",0xe490:"苣",0xe491:"苟",0xe492:"苒",0xe493:"苴",0xe494:"苳",0xe495:"苺",0xe496:"莓",0xe497:"范",0xe498:"苻",0xe499:"苹",0xe49a:"苞",0xe49b:"茆",0xe49c:"苜",0xe49d:"茉",0xe49e:"苙",0xe49f:"茵",0xe4a0:"茴",0xe4a1:"茖",0xe4a2:"茲",0xe4a3:"茱",0xe4a4:"荀",0xe4a5:"茹",0xe4a6:"荐",0xe4a7:"荅",0xe4a8:"茯",0xe4a9:"茫",0xe4aa:"茗",0xe4ab:"茘",0xe4ac:"莅",0xe4ad:"莚",0xe4ae:"莪",0xe4af:"莟",0xe4b0:"莢",0xe4b1:"莖",0xe4b2:"茣",0xe4b3:"莎",0xe4b4:"莇",0xe4b5:"莊",0xe4b6:"荼",0xe4b7:"莵",0xe4b8:"荳",0xe4b9:"荵",0xe4ba:"莠",0xe4bb:"莉",0xe4bc:"莨",0xe4bd:"菴",0xe4be:"萓",0xe4bf:"菫",0xe4c0:"菎",0xe4c1:"菽",0xe4c2:"萃",0xe4c3:"菘",0xe4c4:"萋",0xe4c5:"菁",0xe4c6:"菷",0xe4c7:"萇",0xe4c8:"菠",0xe4c9:"菲",0xe4ca:"萍",0xe4cb:"萢",0xe4cc:"萠",0xe4cd:"莽",0xe4ce:"萸",0xe4cf:"蔆",0xe4d0:"菻",0xe4d1:"葭",0xe4d2:"萪",0xe4d3:"萼",0xe4d4:"蕚",0xe4d5:"蒄",0xe4d6:"葷",0xe4d7:"葫",0xe4d8:"蒭",0xe4d9:"葮",0xe4da:"蒂",0xe4db:"葩",0xe4dc:"葆",0xe4dd:"萬",0xe4de:"葯",0xe4df:"葹",0xe4e0:"萵",0xe4e1:"蓊",0xe4e2:"葢",0xe4e3:"蒹",0xe4e4:"蒿",0xe4e5:"蒟",0xe4e6:"蓙",0xe4e7:"蓍",0xe4e8:"蒻",0xe4e9:"蓚",0xe4ea:"蓐",0xe4eb:"蓁",0xe4ec:"蓆",0xe4ed:"蓖",0xe4ee:"蒡",0xe4ef:"蔡",0xe4f0:"蓿",0xe4f1:"蓴",0xe4f2:"蔗",0xe4f3:"蔘",0xe4f4:"蔬",0xe4f5:"蔟",0xe4f6:"蔕",0xe4f7:"蔔",0xe4f8:"蓼",0xe4f9:"蕀",0xe4fa:"蕣",0xe4fb:"蕘",0xe4fc:"蕈",0xe540:"蕁",0xe541:"蘂",0xe542:"蕋",0xe543:"蕕",0xe544:"薀",0xe545:"薤",0xe546:"薈",0xe547:"薑",0xe548:"薊",0xe549:"薨",0xe54a:"蕭",0xe54b:"薔",0xe54c:"薛",0xe54d:"藪",0xe54e:"薇",0xe54f:"薜",0xe550:"蕷",0xe551:"蕾",0xe552:"薐",0xe553:"藉",0xe554:"薺",0xe555:"藏",0xe556:"薹",0xe557:"藐",0xe558:"藕",0xe559:"藝",0xe55a:"藥",0xe55b:"藜",0xe55c:"藹",0xe55d:"蘊",0xe55e:"蘓",0xe55f:"蘋",0xe560:"藾",0xe561:"藺",0xe562:"蘆",0xe563:"蘢",0xe564:"蘚",0xe565:"蘰",0xe566:"蘿",0xe567:"虍",0xe568:"乕",0xe569:"虔",0xe56a:"號",0xe56b:"虧",0xe56c:"虱",0xe56d:"蚓",0xe56e:"蚣",0xe56f:"蚩",0xe570:"蚪",0xe571:"蚋",0xe572:"蚌",0xe573:"蚶",0xe574:"蚯",0xe575:"蛄",0xe576:"蛆",0xe577:"蚰",0xe578:"蛉",0xe579:"蠣",0xe57a:"蚫",0xe57b:"蛔",0xe57c:"蛞",0xe57d:"蛩",0xe57e:"蛬",0xe580:"蛟",0xe581:"蛛",0xe582:"蛯",0xe583:"蜒",0xe584:"蜆",0xe585:"蜈",0xe586:"蜀",0xe587:"蜃",0xe588:"蛻",0xe589:"蜑",0xe58a:"蜉",0xe58b:"蜍",0xe58c:"蛹",0xe58d:"蜊",0xe58e:"蜴",0xe58f:"蜿",0xe590:"蜷",0xe591:"蜻",0xe592:"蜥",0xe593:"蜩",0xe594:"蜚",0xe595:"蝠",0xe596:"蝟",0xe597:"蝸",0xe598:"蝌",0xe599:"蝎",0xe59a:"蝴",0xe59b:"蝗",0xe59c:"蝨",0xe59d:"蝮",0xe59e:"蝙",0xe59f:"蝓",0xe5a0:"蝣",0xe5a1:"蝪",0xe5a2:"蠅",0xe5a3:"螢",0xe5a4:"螟",0xe5a5:"螂",0xe5a6:"螯",0xe5a7:"蟋",0xe5a8:"螽",0xe5a9:"蟀",0xe5aa:"蟐",0xe5ab:"雖",0xe5ac:"螫",0xe5ad:"蟄",0xe5ae:"螳",0xe5af:"蟇",0xe5b0:"蟆",0xe5b1:"螻",0xe5b2:"蟯",0xe5b3:"蟲",0xe5b4:"蟠",0xe5b5:"蠏",0xe5b6:"蠍",0xe5b7:"蟾",0xe5b8:"蟶",0xe5b9:"蟷",0xe5ba:"蠎",0xe5bb:"蟒",0xe5bc:"蠑",0xe5bd:"蠖",0xe5be:"蠕",0xe5bf:"蠢",0xe5c0:"蠡",0xe5c1:"蠱",0xe5c2:"蠶",0xe5c3:"蠹",0xe5c4:"蠧",0xe5c5:"蠻",0xe5c6:"衄",0xe5c7:"衂",0xe5c8:"衒",0xe5c9:"衙",0xe5ca:"衞",0xe5cb:"衢",0xe5cc:"衫",0xe5cd:"袁",0xe5ce:"衾",0xe5cf:"袞",0xe5d0:"衵",0xe5d1:"衽",0xe5d2:"袵",0xe5d3:"衲",0xe5d4:"袂",0xe5d5:"袗",0xe5d6:"袒",0xe5d7:"袮",0xe5d8:"袙",0xe5d9:"袢",0xe5da:"袍",0xe5db:"袤",0xe5dc:"袰",0xe5dd:"袿",0xe5de:"袱",0xe5df:"裃",0xe5e0:"裄",0xe5e1:"裔",0xe5e2:"裘",0xe5e3:"裙",0xe5e4:"裝",0xe5e5:"裹",0xe5e6:"褂",0xe5e7:"裼",0xe5e8:"裴",0xe5e9:"裨",0xe5ea:"裲",0xe5eb:"褄",0xe5ec:"褌",0xe5ed:"褊",0xe5ee:"褓",0xe5ef:"襃",0xe5f0:"褞",0xe5f1:"褥",0xe5f2:"褪",0xe5f3:"褫",0xe5f4:"襁",0xe5f5:"襄",0xe5f6:"褻",0xe5f7:"褶",0xe5f8:"褸",0xe5f9:"襌",0xe5fa:"褝",0xe5fb:"襠",0xe5fc:"襞",0xe640:"襦",0xe641:"襤",0xe642:"襭",0xe643:"襪",0xe644:"襯",0xe645:"襴",0xe646:"襷",0xe647:"襾",0xe648:"覃",0xe649:"覈",0xe64a:"覊",0xe64b:"覓",0xe64c:"覘",0xe64d:"覡",0xe64e:"覩",0xe64f:"覦",0xe650:"覬",0xe651:"覯",0xe652:"覲",0xe653:"覺",0xe654:"覽",0xe655:"覿",0xe656:"觀",0xe657:"觚",0xe658:"觜",0xe659:"觝",0xe65a:"觧",0xe65b:"觴",0xe65c:"觸",0xe65d:"訃",0xe65e:"訖",0xe65f:"訐",0xe660:"訌",0xe661:"訛",0xe662:"訝",0xe663:"訥",0xe664:"訶",0xe665:"詁",0xe666:"詛",0xe667:"詒",0xe668:"詆",0xe669:"詈",0xe66a:"詼",0xe66b:"詭",0xe66c:"詬",0xe66d:"詢",0xe66e:"誅",0xe66f:"誂",0xe670:"誄",0xe671:"誨",0xe672:"誡",0xe673:"誑",0xe674:"誥",0xe675:"誦",0xe676:"誚",0xe677:"誣",0xe678:"諄",0xe679:"諍",0xe67a:"諂",0xe67b:"諚",0xe67c:"諫",0xe67d:"諳",0xe67e:"諧",0xe680:"諤",0xe681:"諱",0xe682:"謔",0xe683:"諠",0xe684:"諢",0xe685:"諷",0xe686:"諞",0xe687:"諛",0xe688:"謌",0xe689:"謇",0xe68a:"謚",0xe68b:"諡",0xe68c:"謖",0xe68d:"謐",0xe68e:"謗",0xe68f:"謠",0xe690:"謳",0xe691:"鞫",0xe692:"謦",0xe693:"謫",0xe694:"謾",0xe695:"謨",0xe696:"譁",0xe697:"譌",0xe698:"譏",0xe699:"譎",0xe69a:"證",0xe69b:"譖",0xe69c:"譛",0xe69d:"譚",0xe69e:"譫",0xe69f:"譟",0xe6a0:"譬",0xe6a1:"譯",0xe6a2:"譴",0xe6a3:"譽",0xe6a4:"讀",0xe6a5:"讌",0xe6a6:"讎",0xe6a7:"讒",0xe6a8:"讓",0xe6a9:"讖",0xe6aa:"讙",0xe6ab:"讚",0xe6ac:"谺",0xe6ad:"豁",0xe6ae:"谿",0xe6af:"豈",0xe6b0:"豌",0xe6b1:"豎",0xe6b2:"豐",0xe6b3:"豕",0xe6b4:"豢",0xe6b5:"豬",0xe6b6:"豸",0xe6b7:"豺",0xe6b8:"貂",0xe6b9:"貉",0xe6ba:"貅",0xe6bb:"貊",0xe6bc:"貍",0xe6bd:"貎",0xe6be:"貔",0xe6bf:"豼",0xe6c0:"貘",0xe6c1:"戝",0xe6c2:"貭",0xe6c3:"貪",0xe6c4:"貽",0xe6c5:"貲",0xe6c6:"貳",0xe6c7:"貮",0xe6c8:"貶",0xe6c9:"賈",0xe6ca:"賁",0xe6cb:"賤",0xe6cc:"賣",0xe6cd:"賚",0xe6ce:"賽",0xe6cf:"賺",0xe6d0:"賻",0xe6d1:"贄",0xe6d2:"贅",0xe6d3:"贊",0xe6d4:"贇",0xe6d5:"贏",0xe6d6:"贍",0xe6d7:"贐",0xe6d8:"齎",0xe6d9:"贓",0xe6da:"賍",0xe6db:"贔",0xe6dc:"贖",0xe6dd:"赧",0xe6de:"赭",0xe6df:"赱",0xe6e0:"赳",0xe6e1:"趁",0xe6e2:"趙",0xe6e3:"跂",0xe6e4:"趾",0xe6e5:"趺",0xe6e6:"跏",0xe6e7:"跚",0xe6e8:"跖",0xe6e9:"跌",0xe6ea:"跛",0xe6eb:"跋",0xe6ec:"跪",0xe6ed:"跫",0xe6ee:"跟",0xe6ef:"跣",0xe6f0:"跼",0xe6f1:"踈",0xe6f2:"踉",0xe6f3:"跿",0xe6f4:"踝",0xe6f5:"踞",0xe6f6:"踐",0xe6f7:"踟",0xe6f8:"蹂",0xe6f9:"踵",0xe6fa:"踰",0xe6fb:"踴",0xe6fc:"蹊",0xe740:"蹇",0xe741:"蹉",0xe742:"蹌",0xe743:"蹐",0xe744:"蹈",0xe745:"蹙",0xe746:"蹤",0xe747:"蹠",0xe748:"踪",0xe749:"蹣",0xe74a:"蹕",0xe74b:"蹶",0xe74c:"蹲",0xe74d:"蹼",0xe74e:"躁",0xe74f:"躇",0xe750:"躅",0xe751:"躄",0xe752:"躋",0xe753:"躊",0xe754:"躓",0xe755:"躑",0xe756:"躔",0xe757:"躙",0xe758:"躪",0xe759:"躡",0xe75a:"躬",0xe75b:"躰",0xe75c:"軆",0xe75d:"躱",0xe75e:"躾",0xe75f:"軅",0xe760:"軈",0xe761:"軋",0xe762:"軛",0xe763:"軣",0xe764:"軼",0xe765:"軻",0xe766:"軫",0xe767:"軾",0xe768:"輊",0xe769:"輅",0xe76a:"輕",0xe76b:"輒",0xe76c:"輙",0xe76d:"輓",0xe76e:"輜",0xe76f:"輟",0xe770:"輛",0xe771:"輌",0xe772:"輦",0xe773:"輳",0xe774:"輻",0xe775:"輹",0xe776:"轅",0xe777:"轂",0xe778:"輾",0xe779:"轌",0xe77a:"轉",0xe77b:"轆",0xe77c:"轎",0xe77d:"轗",0xe77e:"轜",0xe780:"轢",0xe781:"轣",0xe782:"轤",0xe783:"辜",0xe784:"辟",0xe785:"辣",0xe786:"辭",0xe787:"辯",0xe788:"辷",0xe789:"迚",0xe78a:"迥",0xe78b:"迢",0xe78c:"迪",0xe78d:"迯",0xe78e:"邇",0xe78f:"迴",0xe790:"逅",0xe791:"迹",0xe792:"迺",0xe793:"逑",0xe794:"逕",0xe795:"逡",0xe796:"逍",0xe797:"逞",0xe798:"逖",0xe799:"逋",0xe79a:"逧",0xe79b:"逶",0xe79c:"逵",0xe79d:"逹",0xe79e:"迸",0xe79f:"遏",0xe7a0:"遐",0xe7a1:"遑",0xe7a2:"遒",0xe7a3:"逎",0xe7a4:"遉",0xe7a5:"逾",0xe7a6:"遖",0xe7a7:"遘",0xe7a8:"遞",0xe7a9:"遨",0xe7aa:"遯",0xe7ab:"遶",0xe7ac:"隨",0xe7ad:"遲",0xe7ae:"邂",0xe7af:"遽",0xe7b0:"邁",0xe7b1:"邀",0xe7b2:"邊",0xe7b3:"邉",0xe7b4:"邏",0xe7b5:"邨",0xe7b6:"邯",0xe7b7:"邱",0xe7b8:"邵",0xe7b9:"郢",0xe7ba:"郤",0xe7bb:"扈",0xe7bc:"郛",0xe7bd:"鄂",0xe7be:"鄒",0xe7bf:"鄙",0xe7c0:"鄲",0xe7c1:"鄰",0xe7c2:"酊",0xe7c3:"酖",0xe7c4:"酘",0xe7c5:"酣",0xe7c6:"酥",0xe7c7:"酩",0xe7c8:"酳",0xe7c9:"酲",0xe7ca:"醋",0xe7cb:"醉",0xe7cc:"醂",0xe7cd:"醢",0xe7ce:"醫",0xe7cf:"醯",0xe7d0:"醪",0xe7d1:"醵",0xe7d2:"醴",0xe7d3:"醺",0xe7d4:"釀",0xe7d5:"釁",0xe7d6:"釉",0xe7d7:"釋",0xe7d8:"釐",0xe7d9:"釖",0xe7da:"釟",0xe7db:"釡",0xe7dc:"釛",0xe7dd:"釼",0xe7de:"釵",0xe7df:"釶",0xe7e0:"鈞",0xe7e1:"釿",0xe7e2:"鈔",0xe7e3:"鈬",0xe7e4:"鈕",0xe7e5:"鈑",0xe7e6:"鉞",0xe7e7:"鉗",0xe7e8:"鉅",0xe7e9:"鉉",0xe7ea:"鉤",0xe7eb:"鉈",0xe7ec:"銕",0xe7ed:"鈿",0xe7ee:"鉋",0xe7ef:"鉐",0xe7f0:"銜",0xe7f1:"銖",0xe7f2:"銓",0xe7f3:"銛",0xe7f4:"鉚",0xe7f5:"鋏",0xe7f6:"銹",0xe7f7:"銷",0xe7f8:"鋩",0xe7f9:"錏",0xe7fa:"鋺",0xe7fb:"鍄",0xe7fc:"錮",0xe840:"錙",0xe841:"錢",0xe842:"錚",0xe843:"錣",0xe844:"錺",0xe845:"錵",0xe846:"錻",0xe847:"鍜",0xe848:"鍠",0xe849:"鍼",0xe84a:"鍮",0xe84b:"鍖",0xe84c:"鎰",0xe84d:"鎬",0xe84e:"鎭",0xe84f:"鎔",0xe850:"鎹",0xe851:"鏖",0xe852:"鏗",0xe853:"鏨",0xe854:"鏥",0xe855:"鏘",0xe856:"鏃",0xe857:"鏝",0xe858:"鏐",0xe859:"鏈",0xe85a:"鏤",0xe85b:"鐚",0xe85c:"鐔",0xe85d:"鐓",0xe85e:"鐃",0xe85f:"鐇",0xe860:"鐐",0xe861:"鐶",0xe862:"鐫",0xe863:"鐵",0xe864:"鐡",0xe865:"鐺",0xe866:"鑁",0xe867:"鑒",0xe868:"鑄",0xe869:"鑛",0xe86a:"鑠",0xe86b:"鑢",0xe86c:"鑞",0xe86d:"鑪",0xe86e:"鈩",0xe86f:"鑰",0xe870:"鑵",0xe871:"鑷",0xe872:"鑽",0xe873:"鑚",0xe874:"鑼",0xe875:"鑾",0xe876:"钁",0xe877:"鑿",0xe878:"閂",0xe879:"閇",0xe87a:"閊",0xe87b:"閔",0xe87c:"閖",0xe87d:"閘",0xe87e:"閙",0xe880:"閠",0xe881:"閨",0xe882:"閧",0xe883:"閭",0xe884:"閼",0xe885:"閻",0xe886:"閹",0xe887:"閾",0xe888:"闊",0xe889:"濶",0xe88a:"闃",0xe88b:"闍",0xe88c:"闌",0xe88d:"闕",0xe88e:"闔",0xe88f:"闖",0xe890:"關",0xe891:"闡",0xe892:"闥",0xe893:"闢",0xe894:"阡",0xe895:"阨",0xe896:"阮",0xe897:"阯",0xe898:"陂",0xe899:"陌",0xe89a:"陏",0xe89b:"陋",0xe89c:"陷",0xe89d:"陜",0xe89e:"陞",0xe89f:"陝",0xe8a0:"陟",0xe8a1:"陦",0xe8a2:"陲",0xe8a3:"陬",0xe8a4:"隍",0xe8a5:"隘",0xe8a6:"隕",0xe8a7:"隗",0xe8a8:"險",0xe8a9:"隧",0xe8aa:"隱",0xe8ab:"隲",0xe8ac:"隰",0xe8ad:"隴",0xe8ae:"隶",0xe8af:"隸",0xe8b0:"隹",0xe8b1:"雎",0xe8b2:"雋",0xe8b3:"雉",0xe8b4:"雍",0xe8b5:"襍",0xe8b6:"雜",0xe8b7:"霍",0xe8b8:"雕",0xe8b9:"雹",0xe8ba:"霄",0xe8bb:"霆",0xe8bc:"霈",0xe8bd:"霓",0xe8be:"霎",0xe8bf:"霑",0xe8c0:"霏",0xe8c1:"霖",0xe8c2:"霙",0xe8c3:"霤",0xe8c4:"霪",0xe8c5:"霰",0xe8c6:"霹",0xe8c7:"霽",0xe8c8:"霾",0xe8c9:"靄",0xe8ca:"靆",0xe8cb:"靈",0xe8cc:"靂",0xe8cd:"靉",0xe8ce:"靜",0xe8cf:"靠",0xe8d0:"靤",0xe8d1:"靦",0xe8d2:"靨",0xe8d3:"勒",0xe8d4:"靫",0xe8d5:"靱",0xe8d6:"靹",0xe8d7:"鞅",0xe8d8:"靼",0xe8d9:"鞁",0xe8da:"靺",0xe8db:"鞆",0xe8dc:"鞋",0xe8dd:"鞏",0xe8de:"鞐",0xe8df:"鞜",0xe8e0:"鞨",0xe8e1:"鞦",0xe8e2:"鞣",0xe8e3:"鞳",0xe8e4:"鞴",0xe8e5:"韃",0xe8e6:"韆",0xe8e7:"韈",0xe8e8:"韋",0xe8e9:"韜",0xe8ea:"韭",0xe8eb:"齏",0xe8ec:"韲",0xe8ed:"竟",0xe8ee:"韶",0xe8ef:"韵",0xe8f0:"頏",0xe8f1:"頌",0xe8f2:"頸",0xe8f3:"頤",0xe8f4:"頡",0xe8f5:"頷",0xe8f6:"頽",0xe8f7:"顆",0xe8f8:"顏",0xe8f9:"顋",0xe8fa:"顫",0xe8fb:"顯",0xe8fc:"顰",0xe940:"顱",0xe941:"顴",0xe942:"顳",0xe943:"颪",0xe944:"颯",0xe945:"颱",0xe946:"颶",0xe947:"飄",0xe948:"飃",0xe949:"飆",0xe94a:"飩",0xe94b:"飫",0xe94c:"餃",0xe94d:"餉",0xe94e:"餒",0xe94f:"餔",0xe950:"餘",0xe951:"餡",0xe952:"餝",0xe953:"餞",0xe954:"餤",0xe955:"餠",0xe956:"餬",0xe957:"餮",0xe958:"餽",0xe959:"餾",0xe95a:"饂",0xe95b:"饉",0xe95c:"饅",0xe95d:"饐",0xe95e:"饋",0xe95f:"饑",0xe960:"饒",0xe961:"饌",0xe962:"饕",0xe963:"馗",0xe964:"馘",0xe965:"馥",0xe966:"馭",0xe967:"馮",0xe968:"馼",0xe969:"駟",0xe96a:"駛",0xe96b:"駝",0xe96c:"駘",0xe96d:"駑",0xe96e:"駭",0xe96f:"駮",0xe970:"駱",0xe971:"駲",0xe972:"駻",0xe973:"駸",0xe974:"騁",0xe975:"騏",0xe976:"騅",0xe977:"駢",0xe978:"騙",0xe979:"騫",0xe97a:"騷",0xe97b:"驅",0xe97c:"驂",0xe97d:"驀",0xe97e:"驃",0xe980:"騾",0xe981:"驕",0xe982:"驍",0xe983:"驛",0xe984:"驗",0xe985:"驟",0xe986:"驢",0xe987:"驥",0xe988:"驤",0xe989:"驩",0xe98a:"驫",0xe98b:"驪",0xe98c:"骭",0xe98d:"骰",0xe98e:"骼",0xe98f:"髀",0xe990:"髏",0xe991:"髑",0xe992:"髓",0xe993:"體",0xe994:"髞",0xe995:"髟",0xe996:"髢",0xe997:"髣",0xe998:"髦",0xe999:"髯",0xe99a:"髫",0xe99b:"髮",0xe99c:"髴",0xe99d:"髱",0xe99e:"髷",0xe99f:"髻",0xe9a0:"鬆",0xe9a1:"鬘",0xe9a2:"鬚",0xe9a3:"鬟",0xe9a4:"鬢",0xe9a5:"鬣",0xe9a6:"鬥",0xe9a7:"鬧",0xe9a8:"鬨",0xe9a9:"鬩",0xe9aa:"鬪",0xe9ab:"鬮",0xe9ac:"鬯",0xe9ad:"鬲",0xe9ae:"魄",0xe9af:"魃",0xe9b0:"魏",0xe9b1:"魍",0xe9b2:"魎",0xe9b3:"魑",0xe9b4:"魘",0xe9b5:"魴",0xe9b6:"鮓",0xe9b7:"鮃",0xe9b8:"鮑",0xe9b9:"鮖",0xe9ba:"鮗",0xe9bb:"鮟",0xe9bc:"鮠",0xe9bd:"鮨",0xe9be:"鮴",0xe9bf:"鯀",0xe9c0:"鯊",0xe9c1:"鮹",0xe9c2:"鯆",0xe9c3:"鯏",0xe9c4:"鯑",0xe9c5:"鯒",0xe9c6:"鯣",0xe9c7:"鯢",0xe9c8:"鯤",0xe9c9:"鯔",0xe9ca:"鯡",0xe9cb:"鰺",0xe9cc:"鯲",0xe9cd:"鯱",0xe9ce:"鯰",0xe9cf:"鰕",0xe9d0:"鰔",0xe9d1:"鰉",0xe9d2:"鰓",0xe9d3:"鰌",0xe9d4:"鰆",0xe9d5:"鰈",0xe9d6:"鰒",0xe9d7:"鰊",0xe9d8:"鰄",0xe9d9:"鰮",0xe9da:"鰛",0xe9db:"鰥",0xe9dc:"鰤",0xe9dd:"鰡",0xe9de:"鰰",0xe9df:"鱇",0xe9e0:"鰲",0xe9e1:"鱆",0xe9e2:"鰾",0xe9e3:"鱚",0xe9e4:"鱠",0xe9e5:"鱧",0xe9e6:"鱶",0xe9e7:"鱸",0xe9e8:"鳧",0xe9e9:"鳬",0xe9ea:"鳰",0xe9eb:"鴉",0xe9ec:"鴈",0xe9ed:"鳫",0xe9ee:"鴃",0xe9ef:"鴆",0xe9f0:"鴪",0xe9f1:"鴦",0xe9f2:"鶯",0xe9f3:"鴣",0xe9f4:"鴟",0xe9f5:"鵄",0xe9f6:"鴕",0xe9f7:"鴒",0xe9f8:"鵁",0xe9f9:"鴿",0xe9fa:"鴾",0xe9fb:"鵆",0xe9fc:"鵈",0xea40:"鵝",0xea41:"鵞",0xea42:"鵤",0xea43:"鵑",0xea44:"鵐",0xea45:"鵙",0xea46:"鵲",0xea47:"鶉",0xea48:"鶇",0xea49:"鶫",0xea4a:"鵯",0xea4b:"鵺",0xea4c:"鶚",0xea4d:"鶤",0xea4e:"鶩",0xea4f:"鶲",0xea50:"鷄",0xea51:"鷁",0xea52:"鶻",0xea53:"鶸",0xea54:"鶺",0xea55:"鷆",0xea56:"鷏",0xea57:"鷂",0xea58:"鷙",0xea59:"鷓",0xea5a:"鷸",0xea5b:"鷦",0xea5c:"鷭",0xea5d:"鷯",0xea5e:"鷽",0xea5f:"鸚",0xea60:"鸛",0xea61:"鸞",0xea62:"鹵",0xea63:"鹹",0xea64:"鹽",0xea65:"麁",0xea66:"麈",0xea67:"麋",0xea68:"麌",0xea69:"麒",0xea6a:"麕",0xea6b:"麑",0xea6c:"麝",0xea6d:"麥",0xea6e:"麩",0xea6f:"麸",0xea70:"麪",0xea71:"麭",0xea72:"靡",0xea73:"黌",0xea74:"黎",0xea75:"黏",0xea76:"黐",0xea77:"黔",0xea78:"黜",0xea79:"點",0xea7a:"黝",0xea7b:"黠",0xea7c:"黥",0xea7d:"黨",0xea7e:"黯",0xea80:"黴",0xea81:"黶",0xea82:"黷",0xea83:"黹",0xea84:"黻",0xea85:"黼",0xea86:"黽",0xea87:"鼇",0xea88:"鼈",0xea89:"皷",0xea8a:"鼕",0xea8b:"鼡",0xea8c:"鼬",0xea8d:"鼾",0xea8e:"齊",0xea8f:"齒",0xea90:"齔",0xea91:"齣",0xea92:"齟",0xea93:"齠",0xea94:"齡",0xea95:"齦",0xea96:"齧",0xea97:"齬",0xea98:"齪",0xea99:"齷",0xea9a:"齲",0xea9b:"齶",0xea9c:"龕",0xea9d:"龜",0xea9e:"龠",0xea9f:"堯",0xeaa0:"槇",0xeaa1:"遙",0xeaa2:"瑤",0xeaa3:"凜",0xeaa4:"熙",0xed40:"纊",0xed41:"褜",0xed42:"鍈",0xed43:"銈",0xed44:"蓜",0xed45:"俉",0xed46:"炻",0xed47:"昱",0xed48:"棈",0xed49:"鋹",0xed4a:"曻",0xed4b:"彅",0xed4c:"丨",0xed4d:"仡",0xed4e:"仼",0xed4f:"伀",0xed50:"伃",0xed51:"伹",0xed52:"佖",0xed53:"侒",0xed54:"侊",0xed55:"侚",0xed56:"侔",0xed57:"俍",0xed58:"偀",0xed59:"倢",0xed5a:"俿",0xed5b:"倞",0xed5c:"偆",0xed5d:"偰",0xed5e:"偂",0xed5f:"傔",0xed60:"僴",0xed61:"僘",0xed62:"兊",0xed63:"兤",0xed64:"冝",0xed65:"冾",0xed66:"凬",0xed67:"刕",0xed68:"劜",0xed69:"劦",0xed6a:"勀",0xed6b:"勛",0xed6c:"匀",0xed6d:"匇",0xed6e:"匤",0xed6f:"卲",0xed70:"厓",0xed71:"厲",0xed72:"叝",0xed73:"﨎",0xed74:"咜",0xed75:"咊",0xed76:"咩",0xed77:"哿",0xed78:"喆",0xed79:"坙",0xed7a:"坥",0xed7b:"垬",0xed7c:"埈",0xed7d:"埇",0xed7e:"﨏",0xed80:"塚",0xed81:"增",0xed82:"墲",0xed83:"夋",0xed84:"奓",0xed85:"奛",0xed86:"奝",0xed87:"奣",0xed88:"妤",0xed89:"妺",0xed8a:"孖",0xed8b:"寀",0xed8c:"甯",0xed8d:"寘",0xed8e:"寬",0xed8f:"尞",0xed90:"岦",0xed91:"岺",0xed92:"峵",0xed93:"崧",0xed94:"嵓",0xed95:"﨑",0xed96:"嵂",0xed97:"嵭",0xed98:"嶸",0xed99:"嶹",0xed9a:"巐",0xed9b:"弡",0xed9c:"弴",0xed9d:"彧",0xed9e:"德",0xed9f:"忞",0xeda0:"恝",0xeda1:"悅",0xeda2:"悊",0xeda3:"惞",0xeda4:"惕",0xeda5:"愠",0xeda6:"惲",0xeda7:"愑",0xeda8:"愷",0xeda9:"愰",0xedaa:"憘",0xedab:"戓",0xedac:"抦",0xedad:"揵",0xedae:"摠",0xedaf:"撝",0xedb0:"擎",0xedb1:"敎",0xedb2:"昀",0xedb3:"昕",0xedb4:"昻",0xedb5:"昉",0xedb6:"昮",0xedb7:"昞",0xedb8:"昤",0xedb9:"晥",0xedba:"晗",0xedbb:"晙",0xedbc:"晴",0xedbd:"晳",0xedbe:"暙",0xedbf:"暠",0xedc0:"暲",0xedc1:"暿",0xedc2:"曺",0xedc3:"朎",0xedc4:"朗",0xedc5:"杦",0xedc6:"枻",0xedc7:"桒",0xedc8:"柀",0xedc9:"栁",0xedca:"桄",0xedcb:"棏",0xedcc:"﨓",0xedcd:"楨",0xedce:"﨔",0xedcf:"榘",0xedd0:"槢",0xedd1:"樰",0xedd2:"橫",0xedd3:"橆",0xedd4:"橳",0xedd5:"橾",0xedd6:"櫢",0xedd7:"櫤",0xedd8:"毖",0xedd9:"氿",0xedda:"汜",0xeddb:"沆",0xeddc:"汯",0xeddd:"泚",0xedde:"洄",0xeddf:"涇",0xede0:"浯",0xede1:"涖",0xede2:"涬",0xede3:"淏",0xede4:"淸",0xede5:"淲",0xede6:"淼",0xede7:"渹",0xede8:"湜",0xede9:"渧",0xedea:"渼",0xedeb:"溿",0xedec:"澈",0xeded:"澵",0xedee:"濵",0xedef:"瀅",0xedf0:"瀇",0xedf1:"瀨",0xedf2:"炅",0xedf3:"炫",0xedf4:"焏",0xedf5:"焄",0xedf6:"煜",0xedf7:"煆",0xedf8:"煇",0xedf9:"凞",0xedfa:"燁",0xedfb:"燾",0xedfc:"犱",0xee40:"犾",0xee41:"猤",0xee42:"猪",0xee43:"獷",0xee44:"玽",0xee45:"珉",0xee46:"珖",0xee47:"珣",0xee48:"珒",0xee49:"琇",0xee4a:"珵",0xee4b:"琦",0xee4c:"琪",0xee4d:"琩",0xee4e:"琮",0xee4f:"瑢",0xee50:"璉",0xee51:"璟",0xee52:"甁",0xee53:"畯",0xee54:"皂",0xee55:"皜",0xee56:"皞",0xee57:"皛",0xee58:"皦",0xee59:"益",0xee5a:"睆",0xee5b:"劯",0xee5c:"砡",0xee5d:"硎",0xee5e:"硤",0xee5f:"硺",0xee60:"礰",0xee61:"礼",0xee62:"神",0xee63:"祥",0xee64:"禔",0xee65:"福",0xee66:"禛",0xee67:"竑",0xee68:"竧",0xee69:"靖",0xee6a:"竫",0xee6b:"箞",0xee6c:"精",0xee6d:"絈",0xee6e:"絜",0xee6f:"綷",0xee70:"綠",0xee71:"緖",0xee72:"繒",0xee73:"罇",0xee74:"羡",0xee75:"羽",0xee76:"茁",0xee77:"荢",0xee78:"荿",0xee79:"菇",0xee7a:"菶",0xee7b:"葈",0xee7c:"蒴",0xee7d:"蕓",0xee7e:"蕙",0xee80:"蕫",0xee81:"﨟",0xee82:"薰",0xee83:"蘒",0xee84:"﨡",0xee85:"蠇",0xee86:"裵",0xee87:"訒",0xee88:"訷",0xee89:"詹",0xee8a:"誧",0xee8b:"誾",0xee8c:"諟",0xee8d:"諸",0xee8e:"諶",0xee8f:"譓",0xee90:"譿",0xee91:"賰",0xee92:"賴",0xee93:"贒",0xee94:"赶",0xee95:"﨣",0xee96:"軏",0xee97:"﨤",0xee98:"逸",0xee99:"遧",0xee9a:"郞",0xee9b:"都",0xee9c:"鄕",0xee9d:"鄧",0xee9e:"釚",0xee9f:"釗",0xeea0:"釞",0xeea1:"釭",0xeea2:"釮",0xeea3:"釤",0xeea4:"釥",0xeea5:"鈆",0xeea6:"鈐",0xeea7:"鈊",0xeea8:"鈺",0xeea9:"鉀",0xeeaa:"鈼",0xeeab:"鉎",0xeeac:"鉙",0xeead:"鉑",0xeeae:"鈹",0xeeaf:"鉧",0xeeb0:"銧",0xeeb1:"鉷",0xeeb2:"鉸",0xeeb3:"鋧",0xeeb4:"鋗",0xeeb5:"鋙",0xeeb6:"鋐",0xeeb7:"﨧",0xeeb8:"鋕",0xeeb9:"鋠",0xeeba:"鋓",0xeebb:"錥",0xeebc:"錡",0xeebd:"鋻",0xeebe:"﨨",0xeebf:"錞",0xeec0:"鋿",0xeec1:"錝",0xeec2:"錂",0xeec3:"鍰",0xeec4:"鍗",0xeec5:"鎤",0xeec6:"鏆",0xeec7:"鏞",0xeec8:"鏸",0xeec9:"鐱",0xeeca:"鑅",0xeecb:"鑈",0xeecc:"閒",0xeecd:"隆",0xeece:"﨩",0xeecf:"隝",0xeed0:"隯",0xeed1:"霳",0xeed2:"霻",0xeed3:"靃",0xeed4:"靍",0xeed5:"靏",0xeed6:"靑",0xeed7:"靕",0xeed8:"顗",0xeed9:"顥",0xeeda:"飯",0xeedb:"飼",0xeedc:"餧",0xeedd:"館",0xeede:"馞",0xeedf:"驎",0xeee0:"髙",0xeee1:"髜",0xeee2:"魵",0xeee3:"魲",0xeee4:"鮏",0xeee5:"鮱",0xeee6:"鮻",0xeee7:"鰀",0xeee8:"鵰",0xeee9:"鵫",0xeeea:"鶴",0xeeeb:"鸙",0xeeec:"黑",0xeeef:"ⅰ",0xeef0:"ⅱ",0xeef1:"ⅲ",0xeef2:"ⅳ",0xeef3:"ⅴ",0xeef4:"ⅵ",0xeef5:"ⅶ",0xeef6:"ⅷ",0xeef7:"ⅸ",0xeef8:"ⅹ",0xeef9:"￢",0xeefa:"￤",0xeefb:"＇",0xeefc:"＂",0xfa40:"ⅰ",0xfa41:"ⅱ",0xfa42:"ⅲ",0xfa43:"ⅳ",0xfa44:"ⅴ",0xfa45:"ⅵ",0xfa46:"ⅶ",0xfa47:"ⅷ",0xfa48:"ⅸ",0xfa49:"ⅹ",0xfa4a:"Ⅰ",0xfa4b:"Ⅱ",0xfa4c:"Ⅲ",0xfa4d:"Ⅳ",0xfa4e:"Ⅴ",0xfa4f:"Ⅵ",0xfa50:"Ⅶ",0xfa51:"Ⅷ",0xfa52:"Ⅸ",0xfa53:"Ⅹ",0xfa54:"￢",0xfa55:"￤",0xfa56:"＇",0xfa57:"＂",0xfa58:"㈱",0xfa59:"№",0xfa5a:"℡",0xfa5b:"∵",0xfa5c:"纊",0xfa5d:"褜",0xfa5e:"鍈",0xfa5f:"銈",0xfa60:"蓜",0xfa61:"俉",0xfa62:"炻",0xfa63:"昱",0xfa64:"棈",0xfa65:"鋹",0xfa66:"曻",0xfa67:"彅",0xfa68:"丨",0xfa69:"仡",0xfa6a:"仼",0xfa6b:"伀",0xfa6c:"伃",0xfa6d:"伹",0xfa6e:"佖",0xfa6f:"侒",0xfa70:"侊",0xfa71:"侚",0xfa72:"侔",0xfa73:"俍",0xfa74:"偀",0xfa75:"倢",0xfa76:"俿",0xfa77:"倞",0xfa78:"偆",0xfa79:"偰",0xfa7a:"偂",0xfa7b:"傔",0xfa7c:"僴",0xfa7d:"僘",0xfa7e:"兊",0xfa80:"兤",0xfa81:"冝",0xfa82:"冾",0xfa83:"凬",0xfa84:"刕",0xfa85:"劜",0xfa86:"劦",0xfa87:"勀",0xfa88:"勛",0xfa89:"匀",0xfa8a:"匇",0xfa8b:"匤",0xfa8c:"卲",0xfa8d:"厓",0xfa8e:"厲",0xfa8f:"叝",0xfa90:"﨎",0xfa91:"咜",0xfa92:"咊",0xfa93:"咩",0xfa94:"哿",0xfa95:"喆",0xfa96:"坙",0xfa97:"坥",0xfa98:"垬",0xfa99:"埈",0xfa9a:"埇",0xfa9b:"﨏",0xfa9c:"塚",0xfa9d:"增",0xfa9e:"墲",0xfa9f:"夋",0xfaa0:"奓",0xfaa1:"奛",0xfaa2:"奝",0xfaa3:"奣",0xfaa4:"妤",0xfaa5:"妺",0xfaa6:"孖",0xfaa7:"寀",0xfaa8:"甯",0xfaa9:"寘",0xfaaa:"寬",0xfaab:"尞",0xfaac:"岦",0xfaad:"岺",0xfaae:"峵",0xfaaf:"崧",0xfab0:"嵓",0xfab1:"﨑",0xfab2:"嵂",0xfab3:"嵭",0xfab4:"嶸",0xfab5:"嶹",0xfab6:"巐",0xfab7:"弡",0xfab8:"弴",0xfab9:"彧",0xfaba:"德",0xfabb:"忞",0xfabc:"恝",0xfabd:"悅",0xfabe:"悊",0xfabf:"惞",0xfac0:"惕",0xfac1:"愠",0xfac2:"惲",0xfac3:"愑",0xfac4:"愷",0xfac5:"愰",0xfac6:"憘",0xfac7:"戓",0xfac8:"抦",0xfac9:"揵",0xfaca:"摠",0xfacb:"撝",0xfacc:"擎",0xfacd:"敎",0xface:"昀",0xfacf:"昕",0xfad0:"昻",0xfad1:"昉",0xfad2:"昮",0xfad3:"昞",0xfad4:"昤",0xfad5:"晥",0xfad6:"晗",0xfad7:"晙",0xfad8:"晴",0xfad9:"晳",0xfada:"暙",0xfadb:"暠",0xfadc:"暲",0xfadd:"暿",0xfade:"曺",0xfadf:"朎",0xfae0:"朗",0xfae1:"杦",0xfae2:"枻",0xfae3:"桒",0xfae4:"柀",0xfae5:"栁",0xfae6:"桄",0xfae7:"棏",0xfae8:"﨓",0xfae9:"楨",0xfaea:"﨔",0xfaeb:"榘",0xfaec:"槢",0xfaed:"樰",0xfaee:"橫",0xfaef:"橆",0xfaf0:"橳",0xfaf1:"橾",0xfaf2:"櫢",0xfaf3:"櫤",0xfaf4:"毖",0xfaf5:"氿",0xfaf6:"汜",0xfaf7:"沆",0xfaf8:"汯",0xfaf9:"泚",0xfafa:"洄",0xfafb:"涇",0xfafc:"浯",0xfb40:"涖",0xfb41:"涬",0xfb42:"淏",0xfb43:"淸",0xfb44:"淲",0xfb45:"淼",0xfb46:"渹",0xfb47:"湜",0xfb48:"渧",0xfb49:"渼",0xfb4a:"溿",0xfb4b:"澈",0xfb4c:"澵",0xfb4d:"濵",0xfb4e:"瀅",0xfb4f:"瀇",0xfb50:"瀨",0xfb51:"炅",0xfb52:"炫",0xfb53:"焏",0xfb54:"焄",0xfb55:"煜",0xfb56:"煆",0xfb57:"煇",0xfb58:"凞",0xfb59:"燁",0xfb5a:"燾",0xfb5b:"犱",0xfb5c:"犾",0xfb5d:"猤",0xfb5e:"猪",0xfb5f:"獷",0xfb60:"玽",0xfb61:"珉",0xfb62:"珖",0xfb63:"珣",0xfb64:"珒",0xfb65:"琇",0xfb66:"珵",0xfb67:"琦",0xfb68:"琪",0xfb69:"琩",0xfb6a:"琮",0xfb6b:"瑢",0xfb6c:"璉",0xfb6d:"璟",0xfb6e:"甁",0xfb6f:"畯",0xfb70:"皂",0xfb71:"皜",0xfb72:"皞",0xfb73:"皛",0xfb74:"皦",0xfb75:"益",0xfb76:"睆",0xfb77:"劯",0xfb78:"砡",0xfb79:"硎",0xfb7a:"硤",0xfb7b:"硺",0xfb7c:"礰",0xfb7d:"礼",0xfb7e:"神",0xfb80:"祥",0xfb81:"禔",0xfb82:"福",0xfb83:"禛",0xfb84:"竑",0xfb85:"竧",0xfb86:"靖",0xfb87:"竫",0xfb88:"箞",0xfb89:"精",0xfb8a:"絈",0xfb8b:"絜",0xfb8c:"綷",0xfb8d:"綠",0xfb8e:"緖",0xfb8f:"繒",0xfb90:"罇",0xfb91:"羡",0xfb92:"羽",0xfb93:"茁",0xfb94:"荢",0xfb95:"荿",0xfb96:"菇",0xfb97:"菶",0xfb98:"葈",0xfb99:"蒴",0xfb9a:"蕓",0xfb9b:"蕙",0xfb9c:"蕫",0xfb9d:"﨟",0xfb9e:"薰",0xfb9f:"蘒",0xfba0:"﨡",0xfba1:"蠇",0xfba2:"裵",0xfba3:"訒",0xfba4:"訷",0xfba5:"詹",0xfba6:"誧",0xfba7:"誾",0xfba8:"諟",0xfba9:"諸",0xfbaa:"諶",0xfbab:"譓",0xfbac:"譿",0xfbad:"賰",0xfbae:"賴",0xfbaf:"贒",0xfbb0:"赶",0xfbb1:"﨣",0xfbb2:"軏",0xfbb3:"﨤",0xfbb4:"逸",0xfbb5:"遧",0xfbb6:"郞",0xfbb7:"都",0xfbb8:"鄕",0xfbb9:"鄧",0xfbba:"釚",0xfbbb:"釗",0xfbbc:"釞",0xfbbd:"釭",0xfbbe:"釮",0xfbbf:"釤",0xfbc0:"釥",0xfbc1:"鈆",0xfbc2:"鈐",0xfbc3:"鈊",0xfbc4:"鈺",0xfbc5:"鉀",0xfbc6:"鈼",0xfbc7:"鉎",0xfbc8:"鉙",0xfbc9:"鉑",0xfbca:"鈹",0xfbcb:"鉧",0xfbcc:"銧",0xfbcd:"鉷",0xfbce:"鉸",0xfbcf:"鋧",0xfbd0:"鋗",0xfbd1:"鋙",0xfbd2:"鋐",0xfbd3:"﨧",0xfbd4:"鋕",0xfbd5:"鋠",0xfbd6:"鋓",0xfbd7:"錥",0xfbd8:"錡",0xfbd9:"鋻",0xfbda:"﨨",0xfbdb:"錞",0xfbdc:"鋿",0xfbdd:"錝",0xfbde:"錂",0xfbdf:"鍰",0xfbe0:"鍗",0xfbe1:"鎤",0xfbe2:"鏆",0xfbe3:"鏞",0xfbe4:"鏸",0xfbe5:"鐱",0xfbe6:"鑅",0xfbe7:"鑈",0xfbe8:"閒",0xfbe9:"隆",0xfbea:"﨩",0xfbeb:"隝",0xfbec:"隯",0xfbed:"霳",0xfbee:"霻",0xfbef:"靃",0xfbf0:"靍",0xfbf1:"靏",0xfbf2:"靑",0xfbf3:"靕",0xfbf4:"顗",0xfbf5:"顥",0xfbf6:"飯",0xfbf7:"飼",0xfbf8:"餧",0xfbf9:"館",0xfbfa:"馞",0xfbfb:"驎",0xfbfc:"髙",0xfc40:"髜",0xfc41:"魵",0xfc42:"魲",0xfc43:"鮏",0xfc44:"鮱",0xfc45:"鮻",0xfc46:"鰀",0xfc47:"鵰",0xfc48:"鵫",0xfc49:"鶴",0xfc4a:"鸙",0xfc4b:"黑"};

//endregion

// Include MMD.js
//region
function toArrayBuffer(buf) {
    var tmp = new ArrayBuffer(buf.length);
    var arr = new Uint8Array(tmp);
    for (let i = 0; i < buf.length; ++i) arr[i] = buf[i];
    return tmp;
}

// Generated by CoffeeScript 1.6.3
    var Bone, BoneMotion, CameraMotion, IK, Joint, LightMotion, Material, ModelMotion, Morph, MorphMotion, RigidBody,
        SelfShadowMotion, Vertex, bezierp, checkSize, fraction, ipfunc, ipfuncd, lerp1, loadImage,
        previousRegisteredFrame, size_Float32, size_Int8, size_Uint16, size_Uint32, size_Uint8, slice,
        __indexOf = [].indexOf || function (item) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (i in this && this[i] === item) return i;
            }
            return -1;
        };

    MMD = (function () {
        function MMD(canvas, width, height) {
            this.width = width;
            this.height = height;
            this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!this.gl) {
                alert('WebGL not supported in your browser');
                throw 'WebGL not supported';
            }
        }

        MMD.prototype.initShaders = function () {
            var attributes, fshader, line, name, src, type, uniforms, vshader, _i, _j, _k, _l, _len, _len1, _len2,
                _len3, _ref, _ref1, _ref2;
            vshader = this.gl.createShader(this.gl.VERTEX_SHADER);
            this.gl.shaderSource(vshader, MMD.VertexShaderSource);
            this.gl.compileShader(vshader);
            if (!this.gl.getShaderParameter(vshader, this.gl.COMPILE_STATUS)) {
                alert('Vertex shader compilation error');
                throw this.gl.getShaderInfoLog(vshader);
            }
            fshader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
            this.gl.shaderSource(fshader, MMD.FragmentShaderSource);
            this.gl.compileShader(fshader);
            if (!this.gl.getShaderParameter(fshader, this.gl.COMPILE_STATUS)) {
                alert('Fragment shader compilation error');
                throw this.gl.getShaderInfoLog(fshader);
            }
            this.program = this.gl.createProgram();
            this.gl.attachShader(this.program, vshader);
            this.gl.attachShader(this.program, fshader);
            this.gl.linkProgram(this.program);
            if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
                alert('Shader linking error');
                throw this.gl.getProgramInfoLog(this.program);
            }
            this.gl.useProgram(this.program);
            attributes = [];
            uniforms = [];
            _ref = [MMD.VertexShaderSource, MMD.FragmentShaderSource];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                src = _ref[_i];
                _ref1 = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '').split(';');
                for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                    line = _ref1[_j];
                    type = (_ref2 = line.match(/^\s*(uniform|attribute)\s+/)) != null ? _ref2[1] : void 0;
                    if (!type) {
                        continue;
                    }
                    name = line.match(/(\w+)(\[\d+\])?\s*$/)[1];
                    if (type === 'attribute' && __indexOf.call(attributes, name) < 0) {
                        attributes.push(name);
                    }
                    if (type === 'uniform' && __indexOf.call(uniforms, name) < 0) {
                        uniforms.push(name);
                    }
                }
            }
            for (_k = 0, _len2 = attributes.length; _k < _len2; _k++) {
                name = attributes[_k];
                this.program[name] = this.gl.getAttribLocation(this.program, name);
                this.gl.enableVertexAttribArray(this.program[name]);
            }
            for (_l = 0, _len3 = uniforms.length; _l < _len3; _l++) {
                name = uniforms[_l];
                this.program[name] = this.gl.getUniformLocation(this.program, name);
            }
        };

        MMD.prototype.addModel = function (model) {
            this.model = model;
        };

        MMD.prototype.initBuffers = function () {
            this.vbuffers = {};
            this.initVertices();
            this.initIndices();
            this.initTextures();
        };

        MMD.prototype.initVertices = function () {
            var bone1, bone2, buffer, data, edge, i, length, model, morphVec, normals, positions1, positions2,
                rotations1, rotations2, uvs, vectors1, vectors2, vertex, weight, _i, _j, _len, _ref;
            model = this.model;
            length = model.vertices.length;
            weight = new Float32Array(length);
            vectors1 = new Float32Array(3 * length);
            vectors2 = new Float32Array(3 * length);
            rotations1 = new Float32Array(4 * length);
            rotations2 = new Float32Array(4 * length);
            positions1 = new Float32Array(3 * length);
            positions2 = new Float32Array(3 * length);
            morphVec = new Float32Array(3 * length);
            normals = new Float32Array(3 * length);
            uvs = new Float32Array(2 * length);
            edge = new Float32Array(length);
            for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                vertex = model.vertices[i];
                bone1 = model.bones[vertex.bone_num1];
                bone2 = model.bones[vertex.bone_num2];
                weight[i] = vertex.bone_weight;
                vectors1[3 * i] = vertex.x - bone1.head_pos[0];
                vectors1[3 * i + 1] = vertex.y - bone1.head_pos[1];
                vectors1[3 * i + 2] = vertex.z - bone1.head_pos[2];
                vectors2[3 * i] = vertex.x - bone2.head_pos[0];
                vectors2[3 * i + 1] = vertex.y - bone2.head_pos[1];
                vectors2[3 * i + 2] = vertex.z - bone2.head_pos[2];
                positions1[3 * i] = bone1.head_pos[0];
                positions1[3 * i + 1] = bone1.head_pos[1];
                positions1[3 * i + 2] = bone1.head_pos[2];
                positions2[3 * i] = bone2.head_pos[0];
                positions2[3 * i + 1] = bone2.head_pos[1];
                positions2[3 * i + 2] = bone2.head_pos[2];
                rotations1[4 * i + 3] = 1;
                rotations2[4 * i + 3] = 1;
                normals[3 * i] = vertex.nx;
                normals[3 * i + 1] = vertex.ny;
                normals[3 * i + 2] = vertex.nz;
                uvs[2 * i] = vertex.u;
                uvs[2 * i + 1] = vertex.v;
                edge[i] = 1 - vertex.edge_flag;
            }
            model.rotations1 = rotations1;
            model.rotations2 = rotations2;
            model.positions1 = positions1;
            model.positions2 = positions2;
            model.morphVec = morphVec;
            _ref = [
                {
                    attribute: 'aBoneWeight',
                    array: weight,
                    size: 1
                }, {
                    attribute: 'aVectorFromBone1',
                    array: vectors1,
                    size: 3
                }, {
                    attribute: 'aVectorFromBone2',
                    array: vectors2,
                    size: 3
                }, {
                    attribute: 'aBone1Rotation',
                    array: rotations1,
                    size: 4
                }, {
                    attribute: 'aBone2Rotation',
                    array: rotations2,
                    size: 4
                }, {
                    attribute: 'aBone1Position',
                    array: positions1,
                    size: 3
                }, {
                    attribute: 'aBone2Position',
                    array: positions2,
                    size: 3
                }, {
                    attribute: 'aMultiPurposeVector',
                    array: morphVec,
                    size: 3
                }, {
                    attribute: 'aVertexNormal',
                    array: normals,
                    size: 3
                }, {
                    attribute: 'aTextureCoord',
                    array: uvs,
                    size: 2
                }, {
                    attribute: 'aVertexEdge',
                    array: edge,
                    size: 1
                }
            ];
            for (_j = 0, _len = _ref.length; _j < _len; _j++) {
                data = _ref[_j];
                buffer = this.gl.createBuffer();
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, data.array, this.gl.STATIC_DRAW);
                this.vbuffers[data.attribute] = {
                    size: data.size,
                    buffer: buffer
                };
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        };

        MMD.prototype.initIndices = function () {
            var indices;
            indices = this.model.triangles;
            this.ibuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ibuffer);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW);
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        };

        MMD.prototype.initTextures = function () {
            var fileName, material, model, toonIndex, type, _i, _j, _len, _len1, _ref, _ref1,
                _this = this;
            model = this.model;
            this.textureManager = new MMD.TextureManager(this);
            this.textureManager.onload = function () {
                return _this.redraw = true;
            };
            _ref = model.materials;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                material = _ref[_i];
                if (!material.textures) {
                    material.textures = {};
                }
                toonIndex = material.toon_index;
                fileName = 'toon' + ('0' + (toonIndex + 1)).slice(-2) + '.bmp';
                if (toonIndex === -1 || !model.toon_file_names || fileName === model.toon_file_names[toonIndex]) {
                    fileName = './src/Model/Pmd/data/' + fileName;
                } else {
                    fileName = model.directory + '/' + model.toon_file_names[toonIndex];
                }
                material.textures.toon = this.textureManager.get('toon', fileName);
                if (material.texture_file_name) {
                    _ref1 = material.texture_file_name.split('*');
                    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                        fileName = _ref1[_j];
                        switch (fileName.slice(-4)) {
                            case '.sph':
                                type = 'sph';
                                break;
                            case '.spa':
                                type = 'spa';
                                break;
                            case '.tga':
                                type = 'regular';
                                fileName += '.png';
                                break;
                            default:
                                type = 'regular';
                        }
                        material.textures[type] = this.textureManager.get(type, model.directory + '/' + fileName);
                    }
                }
            }
        };

        MMD.prototype.start = function () {
            var before, count, interval, step, t0,
                _this = this;
            this.gl.clearColor(1, 1, 1, 1);
            this.gl.clearDepth(1);
            this.gl.enable(this.gl.DEPTH_TEST);
            this.redraw = true;
            if (this.drawSelfShadow) {
                this.shadowMap = new MMD.ShadowMap(this);
            }
            this.motionManager = new MMD.MotionManager;
            count = 0;
            t0 = before = Date.now();
            interval = 1000 / this.fps;
            step = function () {
                var now;
                _this.move();
                _this.computeMatrices();
                _this.render();
                now = Date.now();
                if (++count % _this.fps === 0) {
                    _this.realFps = _this.fps / (now - before) * 1000;
                    before = now;
                }
                if(!document.body.contains(this.gl.canvas))return;
                return setTimeout(step, (t0 + count * interval) - now);
            };
            step();
        };

        MMD.prototype.move = function () {
            if (!this.playing || this.textureManager.pendingCount > 0) {
                return;
            }
            if (++this.frame > this.motionManager.lastFrame) {
                this.pause();
                this.frame = -1;
                return;
            }
            this.moveCamera();
            this.moveLight();
            this.moveModel();
        };

        MMD.prototype.moveCamera = function () {
            var camera;
            camera = this.motionManager.getCameraFrame(this.frame);
            if (camera && !this.ignoreCameraMotion) {
                this.distance = camera.distance;
                this.rotx = camera.rotation[0];
                this.roty = camera.rotation[1];
                this.center = vec3.create(camera.location);
                this.fovy = camera.view_angle;
            }
        };

        MMD.prototype.moveLight = function () {
            var light;
            light = this.motionManager.getLightFrame(this.frame);
            if (light) {
                this.lightDirection = light.location;
                this.lightColor = light.color;
            }
        };

        MMD.prototype.moveModel = function () {
            var bones, model, morphs, _ref;
            model = this.model;
            _ref = this.motionManager.getModelFrame(model, this.frame), morphs = _ref.morphs, bones = _ref.bones;
            this.moveMorphs(model, morphs);
            this.moveBones(model, bones);
        };

        MMD.prototype.moveMorphs = function (model, morphs) {
            var b, base, i, j, morph, vert, weight, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
            if (!morphs) {
                return;
            }
            if (model.morphs.length === 0) {
                return;
            }
            _ref = model.morphs;
            for (j = _i = 0, _len = _ref.length; _i < _len; j = ++_i) {
                morph = _ref[j];
                if (j === 0) {
                    base = morph;
                    continue;
                }
                if (!(morph.name in morphs)) {
                    continue;
                }
                weight = morphs[morph.name];
                _ref1 = morph.vert_data;
                for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                    vert = _ref1[_j];
                    b = base.vert_data[vert.index];
                    i = b.index;
                    model.morphVec[3 * i] += vert.x * weight;
                    model.morphVec[3 * i + 1] += vert.y * weight;
                    model.morphVec[3 * i + 2] += vert.z * weight;
                }
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbuffers.aMultiPurposeVector.buffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, model.morphVec, this.gl.STATIC_DRAW);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
            _ref2 = base.vert_data;
            for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                b = _ref2[_k];
                i = b.index;
                model.morphVec[3 * i] = 0;
                model.morphVec[3 * i + 1] = 0;
                model.morphVec[3 * i + 2] = 0;
            }
        };

        MMD.prototype.moveBones = function (model, bones) {
            var bone, boneMotions, constrainedBones, getBoneMotion, i, individualBoneMotions, length, motion1, motion2,
                originalBonePositions, parentBones, pos1, pos2, positions1, positions2, resolveIKs, rot1, rot2,
                rotations1, rotations2, vertex, _i, _j, _k, _len, _ref, _ref1, _ref2;
            if (!bones) {
                return;
            }
            individualBoneMotions = [];
            boneMotions = [];
            originalBonePositions = [];
            parentBones = [];
            constrainedBones = [];
            _ref = model.bones;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                bone = _ref[i];
                individualBoneMotions[i] = (_ref1 = bones[bone.name]) != null ? _ref1 : {
                    rotation: quat4.create([0, 0, 0, 1]),
                    location: vec3.create()
                };
                boneMotions[i] = {
                    r: quat4.create(),
                    p: vec3.create(),
                    tainted: true
                };
                originalBonePositions[i] = bone.head_pos;
                parentBones[i] = bone.parent_bone_index;
                if (bone.name.indexOf('\u3072\u3056') > 0) {
                    constrainedBones[i] = true;
                }
            }
            getBoneMotion = function (boneIndex) {
                var m, motion, p, parentIndex, parentMotion, r, t;
                motion = boneMotions[boneIndex];
                if (motion && !motion.tainted) {
                    return motion;
                }
                m = individualBoneMotions[boneIndex];
                r = quat4.set(m.rotation, motion.r);
                t = m.location;
                p = vec3.set(originalBonePositions[boneIndex], motion.p);
                if (parentBones[boneIndex] === 0xFFFF) {
                    return boneMotions[boneIndex] = {
                        p: vec3.add(p, t),
                        r: r,
                        tainted: false
                    };
                } else {
                    parentIndex = parentBones[boneIndex];
                    parentMotion = getBoneMotion(parentIndex);
                    r = quat4.multiply(parentMotion.r, r, r);
                    p = vec3.subtract(p, originalBonePositions[parentIndex]);
                    vec3.add(p, t);
                    vec3.rotateByQuat4(p, parentMotion.r);
                    vec3.add(p, parentMotion.p);
                    return boneMotions[boneIndex] = {
                        p: p,
                        r: r,
                        tainted: false
                    };
                }
            };
            resolveIKs = function () {
                var axis, axisLen, boneIndex, bonePos, c, ik, ikbonePos, ikboneVec, ikboneVecLen, j, maxangle,
                    minLength, motion, n, parentRotation, q, r, sinTheta, targetIndex, targetPos, targetVec,
                    targetVecLen, theta, tmpQ, tmpR, _j, _len1, _ref2, _results;
                targetVec = vec3.create();
                ikboneVec = vec3.create();
                axis = vec3.create();
                tmpQ = quat4.create();
                tmpR = quat4.create();
                _ref2 = model.iks;
                _results = [];
                for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                    ik = _ref2[_j];
                    ikbonePos = getBoneMotion(ik.bone_index).p;
                    targetIndex = ik.target_bone_index;
                    minLength = 0.1 * vec3.length(vec3.subtract(originalBonePositions[targetIndex], originalBonePositions[parentBones[targetIndex]], axis));
                    _results.push((function () {
                        var _k, _ref3, _results1;
                        _results1 = [];
                        for (n = _k = 0, _ref3 = ik.iterations; 0 <= _ref3 ? _k < _ref3 : _k > _ref3; n = 0 <= _ref3 ? ++_k : --_k) {
                            targetPos = getBoneMotion(targetIndex).p;
                            if (minLength > vec3.length(vec3.subtract(targetPos, ikbonePos, axis))) {
                                break;
                            }
                            _results1.push((function () {
                                var _l, _len2, _m, _ref4, _results2;
                                _ref4 = ik.child_bones;
                                _results2 = [];
                                for (i = _l = 0, _len2 = _ref4.length; _l < _len2; i = ++_l) {
                                    boneIndex = _ref4[i];
                                    motion = getBoneMotion(boneIndex);
                                    bonePos = motion.p;
                                    if (i > 0) {
                                        targetPos = getBoneMotion(targetIndex).p;
                                    }
                                    targetVec = vec3.subtract(targetPos, bonePos, targetVec);
                                    targetVecLen = vec3.length(targetVec);
                                    if (targetVecLen < minLength) {
                                        continue;
                                    }
                                    ikboneVec = vec3.subtract(ikbonePos, bonePos, ikboneVec);
                                    ikboneVecLen = vec3.length(ikboneVec);
                                    if (ikboneVecLen < minLength) {
                                        continue;
                                    }
                                    axis = vec3.cross(targetVec, ikboneVec, axis);
                                    axisLen = vec3.length(axis);
                                    sinTheta = axisLen / ikboneVecLen / targetVecLen;
                                    if (sinTheta < 0.001) {
                                        continue;
                                    }
                                    maxangle = (i + 1) * ik.control_weight * 4;
                                    theta = Math.asin(sinTheta);
                                    if (vec3.dot(targetVec, ikboneVec) < 0) {
                                        theta = 3.141592653589793 - theta;
                                    }
                                    if (theta > maxangle) {
                                        theta = maxangle;
                                    }
                                    q = quat4.set(vec3.scale(axis, Math.sin(theta / 2) / axisLen), tmpQ);
                                    q[3] = Math.cos(theta / 2);
                                    parentRotation = getBoneMotion(parentBones[boneIndex]).r;
                                    r = quat4.inverse(parentRotation, tmpR);
                                    r = quat4.multiply(quat4.multiply(r, q), motion.r);
                                    if (constrainedBones[boneIndex]) {
                                        c = r[3];
                                        r = quat4.set([Math.sqrt(1 - c * c), 0, 0, c], r);
                                        quat4.inverse(boneMotions[boneIndex].r, q);
                                        quat4.multiply(r, q, q);
                                        q = quat4.multiply(parentRotation, q, q);
                                    }
                                    quat4.normalize(r, individualBoneMotions[boneIndex].rotation);
                                    quat4.multiply(q, motion.r, motion.r);
                                    for (j = _m = 0; 0 <= i ? _m < i : _m > i; j = 0 <= i ? ++_m : --_m) {
                                        boneMotions[ik.child_bones[j]].tainted = true;
                                    }
                                    _results2.push(boneMotions[ik.target_bone_index].tainted = true);
                                }
                                return _results2;
                            })());
                        }
                        return _results1;
                    })());
                }
                return _results;
            };
            resolveIKs();
            for (i = _j = 0, _ref2 = model.bones.length; 0 <= _ref2 ? _j < _ref2 : _j > _ref2; i = 0 <= _ref2 ? ++_j : --_j) {
                getBoneMotion(i);
            }
            rotations1 = model.rotations1;
            rotations2 = model.rotations2;
            positions1 = model.positions1;
            positions2 = model.positions2;
            length = model.vertices.length;
            for (i = _k = 0; 0 <= length ? _k < length : _k > length; i = 0 <= length ? ++_k : --_k) {
                vertex = model.vertices[i];
                motion1 = boneMotions[vertex.bone_num1];
                motion2 = boneMotions[vertex.bone_num2];
                rot1 = motion1.r;
                pos1 = motion1.p;
                rot2 = motion2.r;
                pos2 = motion2.p;
                rotations1[i * 4] = rot1[0];
                rotations1[i * 4 + 1] = rot1[1];
                rotations1[i * 4 + 2] = rot1[2];
                rotations1[i * 4 + 3] = rot1[3];
                rotations2[i * 4] = rot2[0];
                rotations2[i * 4 + 1] = rot2[1];
                rotations2[i * 4 + 2] = rot2[2];
                rotations2[i * 4 + 3] = rot2[3];
                positions1[i * 3] = pos1[0];
                positions1[i * 3 + 1] = pos1[1];
                positions1[i * 3 + 2] = pos1[2];
                positions2[i * 3] = pos2[0];
                positions2[i * 3 + 1] = pos2[1];
                positions2[i * 3 + 2] = pos2[2];
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbuffers.aBone1Rotation.buffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, rotations1, this.gl.STATIC_DRAW);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbuffers.aBone2Rotation.buffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, rotations2, this.gl.STATIC_DRAW);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbuffers.aBone1Position.buffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, positions1, this.gl.STATIC_DRAW);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbuffers.aBone2Position.buffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, positions2, this.gl.STATIC_DRAW);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        };

        MMD.prototype.computeMatrices = function () {
            var up;
            this.modelMatrix = mat4.createIdentity();
            this.cameraPosition = vec3.create([0, 0, this.distance]);
            vec3.rotateX(this.cameraPosition, this.rotx);
            vec3.rotateY(this.cameraPosition, this.roty);
            vec3.moveBy(this.cameraPosition, this.center);
            up = [0, 1, 0];
            vec3.rotateX(up, this.rotx);
            vec3.rotateY(up, this.roty);
            this.viewMatrix = mat4.lookAt(this.cameraPosition, this.center, up);
            this.mvMatrix = mat4.createMultiply(this.viewMatrix, this.modelMatrix);
            this.pMatrix = mat4.perspective(this.fovy, this.width / this.height, 0.1, 1000.0);
            this.nMatrix = mat4.inverseTranspose(this.mvMatrix, mat4.create());
        };

        MMD.prototype.render = function () {
            var attribute, material, offset, vb, _i, _j, _len, _len1, _ref, _ref1, _ref2;
            if (!this.redraw && !this.playing) {
                return;
            }
            this.redraw = false;
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            this.gl.viewport(0, 0, this.width, this.height);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            _ref = this.vbuffers;
            for (attribute in _ref) {
                vb = _ref[attribute];
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vb.buffer);
                this.gl.vertexAttribPointer(this.program[attribute], vb.size, this.gl.FLOAT, false, 0, 0);
            }
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ibuffer);
            this.setSelfShadowTexture();
            this.setUniforms();
            this.gl.enable(this.gl.CULL_FACE);
            this.gl.enable(this.gl.BLEND);
            this.gl.blendFuncSeparate(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA, this.gl.SRC_ALPHA, this.gl.DST_ALPHA);
            offset = 0;
            _ref1 = this.model.materials;
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                material = _ref1[_i];
                this.renderMaterial(material, offset);
                offset += material.face_vert_count;
            }
            this.gl.disable(this.gl.BLEND);
            offset = 0;
            _ref2 = this.model.materials;
            for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                material = _ref2[_j];
                this.renderEdge(material, offset);
                offset += material.face_vert_count;
            }
            this.gl.disable(this.gl.CULL_FACE);
            this.renderAxes();
            this.gl.flush();
        };

        MMD.prototype.setSelfShadowTexture = function () {
            var material, model, offset, _i, _len, _ref, _ref1;
            if (!this.drawSelfShadow) {
                return;
            }
            model = this.model;
            this.shadowMap.computeMatrices();
            this.shadowMap.beforeRender();
            offset = 0;
            _ref = model.materials;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                material = _ref[_i];
                if ((0.979 < (_ref1 = material.alpha) && _ref1 < 0.981)) {
                    continue;
                }
                this.gl.drawElements(this.gl.TRIANGLES, material.face_vert_count, this.gl.UNSIGNED_SHORT, offset * 2);
                offset += material.face_vert_count;
            }
            this.shadowMap.afterRender();
            this.gl.activeTexture(this.gl.TEXTURE3);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.shadowMap.getTexture());
            this.gl.uniform1i(this.program.uShadowMap, 3);
            this.gl.uniformMatrix4fv(this.program.uLightMatrix, false, this.shadowMap.getLightMatrix());
            this.gl.uniform1i(this.program.uSelfShadow, true);
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            this.gl.viewport(0, 0, this.width, this.height);
        };

        MMD.prototype.setUniforms = function () {
            var lightDirection;
            this.gl.uniform1f(this.program.uEdgeThickness, this.edgeThickness);
            this.gl.uniform3fv(this.program.uEdgeColor, this.edgeColor);
            this.gl.uniformMatrix4fv(this.program.uMVMatrix, false, this.mvMatrix);
            this.gl.uniformMatrix4fv(this.program.uPMatrix, false, this.pMatrix);
            this.gl.uniformMatrix4fv(this.program.uNMatrix, false, this.nMatrix);
            lightDirection = vec3.createNormalize(this.lightDirection);
            mat4.multiplyVec3(this.nMatrix, lightDirection);
            this.gl.uniform3fv(this.program.uLightDirection, lightDirection);
            this.gl.uniform3fv(this.program.uLightColor, this.lightColor);
        };

        MMD.prototype.renderMaterial = function (material, offset) {
            var textures;
            this.gl.uniform3fv(this.program.uAmbientColor, material.ambient);
            this.gl.uniform3fv(this.program.uSpecularColor, material.specular);
            this.gl.uniform3fv(this.program.uDiffuseColor, material.diffuse);
            this.gl.uniform1f(this.program.uAlpha, material.alpha);
            this.gl.uniform1f(this.program.uShininess, material.shininess);
            this.gl.uniform1i(this.program.uEdge, false);
            textures = material.textures;
            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, textures.toon);
            this.gl.uniform1i(this.program.uToon, 0);
            if (textures.regular) {
                this.gl.activeTexture(this.gl.TEXTURE1);
                this.gl.bindTexture(this.gl.TEXTURE_2D, textures.regular);
                this.gl.uniform1i(this.program.uTexture, 1);
            }
            this.gl.uniform1i(this.program.uUseTexture, !!textures.regular);
            if (textures.sph || textures.spa) {
                this.gl.activeTexture(this.gl.TEXTURE2);
                this.gl.bindTexture(this.gl.TEXTURE_2D, textures.sph || textures.spa);
                this.gl.uniform1i(this.program.uSphereMap, 2);
                this.gl.uniform1i(this.program.uUseSphereMap, true);
                this.gl.uniform1i(this.program.uIsSphereMapAdditive, !!textures.spa);
            } else {
                this.gl.uniform1i(this.program.uUseSphereMap, false);
            }
            this.gl.cullFace(this.gl.BACK);
            this.gl.drawElements(this.gl.TRIANGLES, material.face_vert_count, this.gl.UNSIGNED_SHORT, offset * 2);
        };

        MMD.prototype.renderEdge = function (material, offset) {
            if (!this.drawEdge || !material.edge_flag) {
                return;
            }
            this.gl.uniform1i(this.program.uEdge, true);
            this.gl.cullFace(this.gl.FRONT);
            this.gl.drawElements(this.gl.TRIANGLES, material.face_vert_count, this.gl.UNSIGNED_SHORT, offset * 2);
            this.gl.cullFace(this.gl.BACK);
            return this.gl.uniform1i(this.program.uEdge, false);
        };

        MMD.prototype.renderAxes = function () {
            var axis, axisBuffer, color, i, _i, _j;
            axisBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, axisBuffer);
            this.gl.vertexAttribPointer(this.program.aMultiPurposeVector, 3, this.gl.FLOAT, false, 0, 0);
            if (this.drawAxes) {
                this.gl.uniform1i(this.program.uAxis, true);
                for (i = _i = 0; _i < 3; i = ++_i) {
                    axis = [0, 0, 0, 0, 0, 0];
                    axis[i] = 65;
                    color = [0, 0, 0];
                    color[i] = 1;
                    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(axis), this.gl.STATIC_DRAW);
                    this.gl.uniform3fv(this.program.uAxisColor, color);
                    this.gl.drawArrays(this.gl.LINES, 0, 2);
                }
                axis = [-50, 0, 0, 0, 0, 0, 0, 0, -50, 0, 0, 0];
                for (i = _j = -50; _j <= 50; i = _j += 5) {
                    if (i !== 0) {
                        axis.push(i, 0, -50, i, 0, 50, -50, 0, i, 50, 0, i);
                    }
                }
                color = [0.7, 0.7, 0.7];
                this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(axis), this.gl.STATIC_DRAW);
                this.gl.uniform3fv(this.program.uAxisColor, color);
                this.gl.drawArrays(this.gl.LINES, 0, 84);
                this.gl.uniform1i(this.program.uAxis, false);
            }
            if (this.drawCenterPoint) {
                this.gl.uniform1i(this.program.uCenterPoint, true);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.center), this.gl.STATIC_DRAW);
                this.gl.drawArrays(this.gl.POINTS, 0, 1);
                this.gl.uniform1i(this.program.uCenterPoint, false);
            }
            this.gl.deleteBuffer(axisBuffer);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        };

        MMD.prototype.registerKeyListener = function (element) {
            var _this = this;
            element.addEventListener('keydown', function (e) {
                switch (e.keyCode + e.shiftKey * 1000 + e.ctrlKey * 10000 + e.altKey * 100000) {
                    case 37:
                        _this.roty += Math.PI / 12;
                        break;
                    case 39:
                        _this.roty -= Math.PI / 12;
                        break;
                    case 38:
                        _this.rotx += Math.PI / 12;
                        break;
                    case 40:
                        _this.rotx -= Math.PI / 12;
                        break;
                    case 33:
                        _this.distance -= 3 * _this.distance / _this.DIST;
                        break;
                    case 34:
                        _this.distance += 3 * _this.distance / _this.DIST;
                        break;
                    case 36:
                        _this.rotx = _this.roty = 0;
                        _this.center = [0, 10, 0];
                        _this.distance = _this.DIST;
                        break;
                    case 1037:
                        vec3.multiplyMat4(_this.center, _this.mvMatrix);
                        _this.center[0] -= _this.distance / _this.DIST;
                        vec3.multiplyMat4(_this.center, mat4.createInverse(_this.mvMatrix));
                        break;
                    case 1039:
                        vec3.multiplyMat4(_this.center, _this.mvMatrix);
                        _this.center[0] += _this.distance / _this.DIST;
                        vec3.multiplyMat4(_this.center, mat4.createInverse(_this.mvMatrix));
                        break;
                    case 1038:
                        vec3.multiplyMat4(_this.center, _this.mvMatrix);
                        _this.center[1] += _this.distance / _this.DIST;
                        vec3.multiplyMat4(_this.center, mat4.createInverse(_this.mvMatrix));
                        break;
                    case 1040:
                        vec3.multiplyMat4(_this.center, _this.mvMatrix);
                        _this.center[1] -= _this.distance / _this.DIST;
                        vec3.multiplyMat4(_this.center, mat4.createInverse(_this.mvMatrix));
                        break;
                    case 32:
                        if (_this.playing) {
                            _this.pause();
                        } else {
                            _this.play();
                        }
                        break;
                    default:
                        return;
                }
                e.preventDefault();
                return _this.redraw = true;
            }, false);
        };

        MMD.prototype.registerMouseListener = function (element) {
            this.registerDragListener(element);
            this.registerWheelListener(element);
        };

        MMD.prototype.registerDragListener = function (element) {
            var _this = this;
            element.addEventListener('mousedown', function (e) {
                var modifier, move, onmousemove, onmouseup, ox, oy;
                if (e.button !== 0) {
                    return;
                }
                modifier = e.shiftKey * 1000 + e.ctrlKey * 10000 + e.altKey * 100000;
                if (modifier !== 0 && modifier !== 1000) {
                    return;
                }
                ox = e.clientX;
                oy = e.clientY;
                move = function (dx, dy, modi) {
                    if (modi === 0) {
                        _this.roty -= dx / 100;
                        _this.rotx -= dy / 100;
                        return _this.redraw = true;
                    } else if (modi === 1000) {
                        vec3.multiplyMat4(_this.center, _this.mvMatrix);
                        _this.center[0] -= dx / 30 * _this.distance / _this.DIST;
                        _this.center[1] += dy / 30 * _this.distance / _this.DIST;
                        vec3.multiplyMat4(_this.center, mat4.createInverse(_this.mvMatrix));
                        return _this.redraw = true;
                    }
                };
                onmouseup = function (e) {
                    var modi;
                    if (e.button !== 0) {
                        return;
                    }
                    modi = e.shiftKey * 1000 + e.ctrlKey * 10000 + e.altKey * 100000;
                    move(e.clientX - ox, e.clientY - oy, modi);
                    element.removeEventListener('mouseup', onmouseup, false);
                    element.removeEventListener('mousemove', onmousemove, false);
                    return e.preventDefault();
                };
                onmousemove = function (e) {
                    var modi, x, y;
                    if (e.button !== 0) {
                        return;
                    }
                    modi = e.shiftKey * 1000 + e.ctrlKey * 10000 + e.altKey * 100000;
                    x = e.clientX;
                    y = e.clientY;
                    move(x - ox, y - oy, modi);
                    ox = x;
                    oy = y;
                    return e.preventDefault();
                };
                element.addEventListener('mouseup', onmouseup, false);
                return element.addEventListener('mousemove', onmousemove, false);
            }, false);
        };

        MMD.prototype.registerWheelListener = function (element) {
            var onwheel,
                _this = this;
            onwheel = function (e) {
                var delta;
                delta = e.detail || e.wheelDelta / (-40);
                _this.distance += delta * _this.distance / _this.DIST;
                _this.redraw = true;
                return e.preventDefault();
            };
            if ('onmousewheel' in window) {
                element.addEventListener('mousewheel', onwheel, false);
            } else {
                element.addEventListener('DOMMouseScroll', onwheel, false);
            }
        };

        MMD.prototype.initParameters = function () {
            this.ignoreCameraMotion = false;
            this.rotx = this.roty = 0;
            this.distance = this.DIST = 35;
            this.center = [0, 10, 0];
            this.fovy = 40;
            this.drawEdge = true;
            this.edgeThickness = 0.004;
            this.edgeColor = [0, 0, 0];
            this.lightDirection = [0.5, 1.0, 0.5];
            this.lightDistance = 8875;
            this.lightColor = [0.6, 0.6, 0.6];
            this.drawSelfShadow = true;
            this.drawAxes = true;
            this.drawCenterPoint = false;
            this.fps = 30;
            this.realFps = this.fps;
            this.playing = false;
            this.frame = -1;
        };

        MMD.prototype.addCameraLightMotion = function (motion, merge_flag, frame_offset) {
            this.motionManager.addCameraLightMotion(motion, merge_flag, frame_offset);
        };

        MMD.prototype.addModelMotion = function (model, motion, merge_flag, frame_offset) {
            this.motionManager.addModelMotion(model, motion, merge_flag, frame_offset);
        };

        MMD.prototype.play = function () {
            this.playing = true;
        };

        MMD.prototype.pause = function () {
            this.playing = false;
        };

        MMD.prototype.rewind = function () {
            this.setFrameNumber(-1);
        };

        MMD.prototype.setFrameNumber = function (num) {
            this.frame = num;
        };

        return MMD;

    })();

    MMD.FragmentShaderSource = '\n#ifdef GL_ES\nprecision highp float;\n#endif\n\nvarying vec2 vTextureCoord;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec4 vLightCoord;\n\nuniform vec3 uLightDirection; // light source direction in world space\nuniform vec3 uLightColor;\n\nuniform vec3 uAmbientColor;\nuniform vec3 uSpecularColor;\nuniform vec3 uDiffuseColor;\nuniform float uAlpha;\nuniform float uShininess;\n\nuniform bool uUseTexture;\nuniform bool uUseSphereMap;\nuniform bool uIsSphereMapAdditive;\n\nuniform sampler2D uToon;\nuniform sampler2D uTexture;\nuniform sampler2D uSphereMap;\n\nuniform bool uEdge;\nuniform float uEdgeThickness;\nuniform vec3 uEdgeColor;\n\nuniform bool uGenerateShadowMap;\nuniform bool uSelfShadow;\nuniform sampler2D uShadowMap;\n\nuniform bool uAxis;\nuniform vec3 uAxisColor;\nuniform bool uCenterPoint;\n\n// from http://spidergl.org/example.php?id=6\nvec4 pack_depth(const in float depth) {\n  const vec4 bit_shift = vec4(256.0*256.0*256.0, 256.0*256.0, 256.0, 1.0);\n  const vec4 bit_mask  = vec4(0.0, 1.0/256.0, 1.0/256.0, 1.0/256.0);\n  vec4 res = fract(depth * bit_shift);\n  res -= res.xxyz * bit_mask;\n  return res;\n}\nfloat unpack_depth(const in vec4 rgba_depth)\n{\n  const vec4 bit_shift = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);\n  float depth = dot(rgba_depth, bit_shift);\n  return depth;\n}\n\nvoid main() {\n  if (uGenerateShadowMap) {\n    //gl_FragData[0] = pack_depth(gl_FragCoord.z);\n    gl_FragColor = pack_depth(gl_FragCoord.z);\n    return;\n  }\n  if (uAxis) {\n    gl_FragColor = vec4(uAxisColor, 1.0);\n    return;\n  }\n  if (uCenterPoint) {\n    vec2 uv = gl_PointCoord * 2.0 - 1.0; // transform [0, 1] -> [-1, 1] coord systems\n    float w = dot(uv, uv);\n    if (w < 0.3 || (w > 0.5 && w < 1.0)) {\n      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n    } else {\n      discard;\n    }\n    return;\n  }\n\n  // vectors are in view space\n  vec3 norm = normalize(vNormal); // each point\'s normal vector in view space\n  vec3 cameraDirection = normalize(-vPosition); // camera located at origin in view space\n\n  vec3 color;\n  float alpha = uAlpha;\n\n  if (uEdge) {\n\n    color = uEdgeColor;\n\n  } else {\n\n    color = vec3(1.0, 1.0, 1.0);\n    if (uUseTexture) {\n      vec4 texColor = texture2D(uTexture, vTextureCoord);\n      color *= texColor.rgb;\n      alpha *= texColor.a;\n    }\n    if (uUseSphereMap) {\n      vec2 sphereCoord = 0.5 * (1.0 + vec2(1.0, -1.0) * norm.xy);\n      if (uIsSphereMapAdditive) {\n        color += texture2D(uSphereMap, sphereCoord).rgb;\n      } else {\n        color *= texture2D(uSphereMap, sphereCoord).rgb;\n      }\n    }\n\n    // specular component\n    vec3 halfAngle = normalize(uLightDirection + cameraDirection);\n    float specularWeight = pow( max(0.001, dot(halfAngle, norm)) , uShininess );\n    //float specularWeight = pow( max(0.0, dot(reflect(-uLightDirection, norm), cameraDirection)) , uShininess ); // another definition\n    vec3 specular = specularWeight * uSpecularColor;\n\n    vec2 toonCoord = vec2(0.0, 0.5 * (1.0 - dot( uLightDirection, norm )));\n\n    if (uSelfShadow) {\n      vec3 lightCoord = vLightCoord.xyz / vLightCoord.w; // projection to texture coordinate (in light space)\n      vec4 rgbaDepth = texture2D(uShadowMap, lightCoord.xy);\n      float depth = unpack_depth(rgbaDepth);\n      if (depth < lightCoord.z - 0.01) {\n        toonCoord = vec2(0.0, 0.55);\n      }\n    }\n\n    color *= uAmbientColor + uLightColor * (uDiffuseColor + specular);\n\n    color = clamp(color, 0.0, 1.0);\n    color *= texture2D(uToon, toonCoord).rgb;\n\n  }\n  gl_FragColor = vec4(color, alpha);\n\n}\n';

    size_Int8 = Int8Array.BYTES_PER_ELEMENT;

    size_Uint8 = Uint8Array.BYTES_PER_ELEMENT;

    size_Uint16 = Uint16Array.BYTES_PER_ELEMENT;

    size_Uint32 = Uint32Array.BYTES_PER_ELEMENT;

    size_Float32 = Float32Array.BYTES_PER_ELEMENT;

    slice = Array.prototype.slice;

    MMD.Model = (function () {
        function Model(directory, filename) {
            this.directory = directory;
            this.filename = filename;
            this.vertices = null;
            this.triangles = null;
            this.materials = null;
            this.bones = null;
            this.morphs = null;
            this.morph_order = null;
            this.bone_group_names = null;
            this.bone_table = null;
            this.english_flag = null;
            this.english_name = null;
            this.english_comment = null;
            this.english_bone_names = null;
            this.english_morph_names = null;
            this.english_bone_group_names = null;
            this.toon_file_names = null;
            this.rigid_bodies = null;
            this.joints = null;
        }

        Model.prototype.load = function (callback) {
            var _this = this;
            fs.readFile(this.directory + '/' + this.filename, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.time('parse');
                    _this.parse(toArrayBuffer(data));
                    console.timeEnd('parse');
                    return callback();
                }
            });
        };

        Model.prototype.loadSync=function(){
            var _this=this;
            let data=fs.readFileSync(this.directory+'/'+this.filename);
            console.time('parse');
            _this.parse(toArrayBuffer(data));
            console.timeEnd('parse');
        };

        Model.prototype.parse = function (buffer) {
            var length, offset, view;
            length = buffer.byteLength;
            view = new DataView(buffer, 0);
            offset = 0;
            offset = this.checkHeader(buffer, view, offset);
            offset = this.getName(buffer, view, offset);
            offset = this.getVertices(buffer, view, offset);
            offset = this.getTriangles(buffer, view, offset);
            offset = this.getMaterials(buffer, view, offset);
            offset = this.getBones(buffer, view, offset);
            offset = this.getIKs(buffer, view, offset);
            offset = this.getMorphs(buffer, view, offset);
            offset = this.getMorphOrder(buffer, view, offset);
            offset = this.getBoneGroupNames(buffer, view, offset);
            offset = this.getBoneTable(buffer, view, offset);
            if (offset >= length) {
                return;
            }
            offset = this.getEnglishFlag(buffer, view, offset);
            if (this.english_flag) {
                offset = this.getEnglishName(buffer, view, offset);
                offset = this.getEnglishBoneNames(buffer, view, offset);
                offset = this.getEnglishMorphNames(buffer, view, offset);
                offset = this.getEnglishBoneGroupNames(buffer, view, offset);
            }
            if (offset >= length) {
                return;
            }
            offset = this.getToonFileNames(buffer, view, offset);
            if (offset >= length) {
                return;
            }
            offset = this.getRigidBodies(buffer, view, offset);
            return offset = this.getJoints(buffer, view, offset);
        };

        Model.prototype.checkHeader = function (buffer, view, offset) {
            if (view.getUint8(0) !== 'P'.charCodeAt(0) || view.getUint8(1) !== 'm'.charCodeAt(0) || view.getUint8(2) !== 'd'.charCodeAt(0) || view.getUint8(3) !== 0x00 || view.getUint8(4) !== 0x00 || view.getUint8(5) !== 0x80 || view.getUint8(6) !== 0x3F) {
                throw 'File is not PMD';
            }
            return offset += 7 * size_Uint8;
        };

        Model.prototype.getName = function (buffer, view, offset) {
            var block;
            block = new Uint8Array(buffer, offset, 20 + 256);
            this.name = sjisArrayToString(slice.call(block, 0, 20));
            this.comment = sjisArrayToString(slice.call(block, 20, 20 + 256));
            return offset += (20 + 256) * size_Uint8;
        };

        Model.prototype.getVertices = function (buffer, view, offset) {
            var i, length;
            length = view.getUint32(offset, true);
            offset += size_Uint32;
            this.vertices = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    _results.push(new Vertex(buffer, view, offset + i * Vertex.size));
                }
                return _results;
            })();
            return offset += length * Vertex.size;
        };

        Model.prototype.getTriangles = function (buffer, view, offset) {
            var i, length, _i;
            length = view.getUint32(offset, true);
            offset += size_Uint32;
            this.triangles = new Uint16Array(length);
            for (i = _i = 0; _i < length; i = _i += 3) {
                this.triangles[i + 1] = view.getUint16(offset + i * size_Uint16, true);
                this.triangles[i] = view.getUint16(offset + (i + 1) * size_Uint16, true);
                this.triangles[i + 2] = view.getUint16(offset + (i + 2) * size_Uint16, true);
            }
            return offset += length * size_Uint16;
        };

        Model.prototype.getMaterials = function (buffer, view, offset) {
            var i, length;
            length = view.getUint32(offset, true);
            offset += size_Uint32;
            this.materials = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    _results.push(new Material(buffer, view, offset + i * Material.size));
                }
                return _results;
            })();
            return offset += length * Material.size;
        };

        Model.prototype.getBones = function (buffer, view, offset) {
            var i, length;
            length = view.getUint16(offset, true);
            offset += size_Uint16;
            this.bones = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    _results.push(new Bone(buffer, view, offset + i * Bone.size));
                }
                return _results;
            })();
            return offset += length * Bone.size;
        };

        Model.prototype.getIKs = function (buffer, view, offset) {
            var i, ik, length;
            length = view.getUint16(offset, true);
            offset += size_Uint16;
            this.iks = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    ik = new IK(buffer, view, offset);
                    offset += ik.getSize();
                    _results.push(ik);
                }
                return _results;
            })();
            return offset;
        };

        Model.prototype.getMorphs = function (buffer, view, offset) {
            var i, length, morph;
            length = view.getUint16(offset, true);
            offset += size_Uint16;
            this.morphs = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    morph = new Morph(buffer, view, offset);
                    offset += morph.getSize();
                    _results.push(morph);
                }
                return _results;
            })();
            return offset;
        };

        Model.prototype.getMorphOrder = function (buffer, view, offset) {
            var i, length;
            length = view.getUint8(offset);
            offset += size_Uint8;
            this.morph_order = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    _results.push(view.getUint16(offset + i * size_Uint16, true));
                }
                return _results;
            })();
            return offset += length * size_Uint16;
        };

        Model.prototype.getBoneGroupNames = function (buffer, view, offset) {
            var block, i, length;
            length = view.getUint8(offset);
            offset += size_Uint8;
            block = new Uint8Array(buffer, offset, 50 * length);
            this.bone_group_names = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    _results.push(sjisArrayToString(slice.call(block, i * 50, (i + 1) * 50)));
                }
                return _results;
            })();
            return offset += length * 50 * size_Uint8;
        };

        Model.prototype.getBoneTable = function (buffer, view, offset) {
            var bone, i, length;
            length = view.getUint32(offset, true);
            offset += size_Uint32;
            this.bone_table = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    bone = {};
                    bone.index = view.getUint16(offset, true);
                    offset += size_Uint16;
                    bone.group_index = view.getUint8(offset);
                    offset += size_Uint8;
                    _results.push(bone);
                }
                return _results;
            })();
            return offset;
        };

        Model.prototype.getEnglishFlag = function (buffer, view, offset) {
            this.english_flag = view.getUint8(offset);
            return offset += size_Uint8;
        };

        Model.prototype.getEnglishName = function (buffer, view, offset) {
            var block;
            block = new Uint8Array(buffer, offset, 20 + 256);
            this.english_name = sjisArrayToString(slice.call(block, 0, 20));
            this.english_comment = sjisArrayToString(slice.call(block, 20, 20 + 256));
            return offset += (20 + 256) * size_Uint8;
        };

        Model.prototype.getEnglishBoneNames = function (buffer, view, offset) {
            var block, i, length;
            length = this.bones.length;
            block = new Uint8Array(buffer, offset, 20 * length);
            this.english_bone_names = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    _results.push(sjisArrayToString(slice.call(block, i * 20, (i + 1) * 20)));
                }
                return _results;
            })();
            return offset += length * 20 * size_Uint8;
        };

        Model.prototype.getEnglishMorphNames = function (buffer, view, offset) {
            var block, i, length;
            length = this.morphs.length - 1;
            if (length < 0) {
                length = 0;
            }
            block = new Uint8Array(buffer, offset, 20 * length);
            this.english_morph_names = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    _results.push(sjisArrayToString(slice.call(block, i * 20, (i + 1) * 20)));
                }
                return _results;
            })();
            return offset += length * 20 * size_Uint8;
        };

        Model.prototype.getEnglishBoneGroupNames = function (buffer, view, offset) {
            var block, i, length;
            length = this.bone_group_names.length;
            block = new Uint8Array(buffer, offset, 50 * length);
            this.english_bone_group_names = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    _results.push(sjisArrayToString(slice.call(block, i * 50, (i + 1) * 50)));
                }
                return _results;
            })();
            return offset += length * 50 * size_Uint8;
        };

        Model.prototype.getToonFileNames = function (buffer, view, offset) {
            var block, i;
            block = new Uint8Array(buffer, offset, 100 * 10);
            this.toon_file_names = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; _i < 10; i = ++_i) {
                    _results.push(sjisArrayToString(slice.call(block, i * 100, (i + 1) * 100)));
                }
                return _results;
            })();
            return offset += 100 * 10 * size_Uint8;
        };

        Model.prototype.getRigidBodies = function (buffer, view, offset) {
            var i, length;
            length = view.getUint32(offset, true);
            offset += size_Uint32;
            this.rigid_bodies = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    _results.push(new RigidBody(buffer, view, offset + i * RigidBody.size));
                }
                return _results;
            })();
            return offset += length * RigidBody.size;
        };

        Model.prototype.getJoints = function (buffer, view, offset) {
            var i, length;
            length = view.getUint32(offset, true);
            offset += size_Uint32;
            this.joints = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    _results.push(new Joint(buffer, view, offset + i * Joint.size));
                }
                return _results;
            })();
            return offset += length * Joint.size;
        };

        return Model;

    })();

    Vertex = (function () {
        function Vertex(buffer, view, offset) {
            this.x = view.getFloat32(offset, true);
            offset += size_Float32;
            this.y = view.getFloat32(offset, true);
            offset += size_Float32;
            this.z = -view.getFloat32(offset, true);
            offset += size_Float32;
            this.nx = view.getFloat32(offset, true);
            offset += size_Float32;
            this.ny = view.getFloat32(offset, true);
            offset += size_Float32;
            this.nz = -view.getFloat32(offset, true);
            offset += size_Float32;
            this.u = view.getFloat32(offset, true);
            offset += size_Float32;
            this.v = view.getFloat32(offset, true);
            offset += size_Float32;
            this.bone_num1 = view.getUint16(offset, true);
            offset += size_Uint16;
            this.bone_num2 = view.getUint16(offset, true);
            offset += size_Uint16;
            this.bone_weight = view.getUint8(offset);
            offset += size_Uint8;
            this.edge_flag = view.getUint8(offset);
            offset += size_Uint8;
        }

        return Vertex;

    })();

    Vertex.size = size_Float32 * 8 + size_Uint16 * 2 + size_Uint8 * 2;

    Material = (function () {
        function Material(buffer, view, offset) {
            var i, tmp;
            tmp = [];
            tmp[0] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = view.getFloat32(offset, true);
            offset += size_Float32;
            this.diffuse = new Float32Array(tmp);
            this.alpha = view.getFloat32(offset, true);
            offset += size_Float32;
            this.shininess = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[0] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = view.getFloat32(offset, true);
            offset += size_Float32;
            this.specular = new Float32Array(tmp);
            tmp[0] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = view.getFloat32(offset, true);
            offset += size_Float32;
            this.ambient = new Float32Array(tmp);
            this.toon_index = view.getInt8(offset);
            offset += size_Int8;
            this.edge_flag = view.getUint8(offset);
            offset += size_Uint8;
            this.face_vert_count = view.getUint32(offset, true);
            offset += size_Uint32;
            this.texture_file_name = sjisArrayToString((function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; _i < 20; i = ++_i) {
                    _results.push(view.getUint8(offset + size_Uint8 * i));
                }
                return _results;
            })());
        }

        return Material;

    })();

    Material.size = size_Float32 * 11 + size_Uint8 * 2 + size_Uint32 + size_Uint8 * 20;

    Bone = (function () {
        function Bone(buffer, view, offset) {
            var tmp;
            this.name = sjisArrayToString(new Uint8Array(buffer, offset, 20));
            offset += size_Uint8 * 20;
            this.parent_bone_index = view.getUint16(offset, true);
            offset += size_Uint16;
            this.tail_pos_bone_index = view.getUint16(offset, true);
            offset += size_Uint16;
            this.type = view.getUint8(offset);
            offset += size_Uint8;
            this.ik_parent_bone_index = view.getUint16(offset, true);
            offset += size_Uint16;
            tmp = [];
            tmp[0] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = -view.getFloat32(offset, true);
            offset += size_Float32;
            this.head_pos = new Float32Array(tmp);
        }

        return Bone;

    })();

    Bone.size = size_Uint8 * 21 + size_Uint16 * 3 + size_Float32 * 3;

    IK = (function () {
        function IK(buffer, view, offset) {
            var chain_length, i;
            this.bone_index = view.getUint16(offset, true);
            offset += size_Uint16;
            this.target_bone_index = view.getUint16(offset, true);
            offset += size_Uint16;
            chain_length = view.getUint8(offset);
            offset += size_Uint8;
            this.iterations = view.getUint16(offset, true);
            offset += size_Uint16;
            this.control_weight = view.getFloat32(offset, true);
            offset += size_Float32;
            this.child_bones = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= chain_length ? _i < chain_length : _i > chain_length; i = 0 <= chain_length ? ++_i : --_i) {
                    _results.push(view.getUint16(offset + size_Uint16 * i, true));
                }
                return _results;
            })();
        }

        IK.prototype.getSize = function () {
            return size_Uint16 * 3 + size_Uint8 + size_Float32 + size_Uint16 * this.child_bones.length;
        };

        return IK;

    })();

    Morph = (function () {
        function Morph(buffer, view, offset) {
            var data, i, vert_count;
            this.name = sjisArrayToString(new Uint8Array(buffer, offset, 20));
            offset += size_Uint8 * 20;
            vert_count = view.getUint32(offset, true);
            offset += size_Uint32;
            this.type = view.getUint8(offset);
            offset += size_Uint8;
            this.vert_data = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= vert_count ? _i < vert_count : _i > vert_count; i = 0 <= vert_count ? ++_i : --_i) {
                    data = {};
                    data.index = view.getUint32(offset, true);
                    offset += size_Uint32;
                    data.x = view.getFloat32(offset, true);
                    offset += size_Float32;
                    data.y = view.getFloat32(offset, true);
                    offset += size_Float32;
                    data.z = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    _results.push(data);
                }
                return _results;
            })();
        }

        Morph.prototype.getSize = function () {
            return size_Uint8 * 21 + size_Uint32 + (size_Uint32 + size_Float32 * 3) * this.vert_data.length;
        };

        return Morph;

    })();

    RigidBody = (function () {
        function RigidBody(buffer, view, offset) {
            var tmp;
            this.name = sjisArrayToString(new Uint8Array(buffer, offset, 20));
            offset += size_Uint8 * 20;
            this.rel_bone_index = view.getUint16(offset, true);
            offset += size_Uint16;
            this.group_index = view.getUint8(offset);
            offset += size_Uint8;
            this.group_target = view.getUint8(offset);
            offset += size_Uint8;
            this.shape_type = view.getUint8(offset, true);
            offset += size_Uint8;
            this.shape_w = view.getFloat32(offset, true);
            offset += size_Float32;
            this.shape_h = view.getFloat32(offset, true);
            offset += size_Float32;
            this.shape_d = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp = [];
            tmp[0] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = -view.getFloat32(offset, true);
            offset += size_Float32;
            this.pos = new Float32Array(tmp);
            tmp[0] = -view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = -view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = view.getFloat32(offset, true);
            offset += size_Float32;
            this.rot = new Float32Array(tmp);
            this.weight = view.getFloat32(offset, true);
            offset += size_Float32;
            this.pos_dim = view.getFloat32(offset, true);
            offset += size_Float32;
            this.rot_dim = view.getFloat32(offset, true);
            offset += size_Float32;
            this.recoil = view.getFloat32(offset, true);
            offset += size_Float32;
            this.friction = view.getFloat32(offset, true);
            offset += size_Float32;
            this.type = view.getUint8(offset);
            offset += size_Uint8;
        }

        return RigidBody;

    })();

    RigidBody.size = size_Uint8 * 23 + size_Uint16 * 2 + size_Float32 * 14;

    Joint = (function () {
        function Joint(buffer, view, offset) {
            var tmp;
            this.name = sjisArrayToString(new Uint8Array(buffer, offset, 20));
            offset += size_Uint8 * 20;
            this.rigidbody_a = view.getUint32(offset, true);
            offset += size_Uint32;
            this.rigidbody_b = view.getUint32(offset, true);
            offset += size_Uint32;
            tmp = [];
            tmp[0] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = -view.getFloat32(offset, true);
            offset += size_Float32;
            this.pos = new Float32Array(tmp);
            tmp[0] = -view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = -view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = view.getFloat32(offset, true);
            offset += size_Float32;
            this.rot = new Float32Array(tmp);
            tmp[0] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = -view.getFloat32(offset, true);
            offset += size_Float32;
            this.constrain_pos_1 = new Float32Array(tmp);
            tmp[0] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = -view.getFloat32(offset, true);
            offset += size_Float32;
            this.constrain_pos_2 = new Float32Array(tmp);
            tmp[0] = -view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = -view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = view.getFloat32(offset, true);
            offset += size_Float32;
            this.constrain_rot_1 = new Float32Array(tmp);
            tmp[0] = -view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = -view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = view.getFloat32(offset, true);
            offset += size_Float32;
            this.constrain_rot_2 = new Float32Array(tmp);
            tmp[0] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = -view.getFloat32(offset, true);
            offset += size_Float32;
            this.spring_pos = new Float32Array(tmp);
            tmp[0] = -view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = -view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = view.getFloat32(offset, true);
            offset += size_Float32;
            this.spring_rot = new Float32Array(tmp);
        }

        return Joint;

    })();

    Joint.size = size_Int8 * 20 + size_Uint32 * 2 + size_Float32 * 24;

    size_Uint8 = Uint8Array.BYTES_PER_ELEMENT;

    size_Uint32 = Uint32Array.BYTES_PER_ELEMENT;

    size_Float32 = Float32Array.BYTES_PER_ELEMENT;

    slice = Array.prototype.slice;

    MMD.Motion = (function () {
        function Motion(path) {
            this.path = path;
        }

        Motion.prototype.load = function (callback) {
            var _this = this;
            fs.readFile(this.path, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.time('parse');
                    _this.parse(toArrayBuffer(data));
                    console.timeEnd('parse');
                    return callback();
                }
            });
        };

        Motion.prototype.parse = function (buffer) {
            var length, offset, view;
            length = buffer.byteLength;
            view = new DataView(buffer, 0);
            offset = 0;
            offset = this.checkHeader(buffer, view, offset);
            offset = this.getModelName(buffer, view, offset);
            offset = this.getBoneMotion(buffer, view, offset);
            offset = this.getMorphMotion(buffer, view, offset);
            offset = this.getCameraMotion(buffer, view, offset);
            offset = this.getLightMotion(buffer, view, offset);
            return offset = this.getSelfShadowMotion(buffer, view, offset);
        };

        Motion.prototype.checkHeader = function (buffer, view, offset) {
            if ('Vocaloid Motion Data 0002\0\0\0\0\0' !== String.fromCharCode.apply(null, slice.call(new Uint8Array(buffer, offset, 30)))) {
                throw 'File is not VMD';
            }
            return offset += 30 * size_Uint8;
        };

        Motion.prototype.getModelName = function (buffer, view, offset) {
            this.model_name = sjisArrayToString(new Uint8Array(buffer, offset, 20));
            return offset += size_Uint8 * 20;
        };

        Motion.prototype.getBoneMotion = function (buffer, view, offset) {
            var i, length;
            length = view.getUint32(offset, true);
            offset += size_Uint32;
            this.bone = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    _results.push(new BoneMotion(buffer, view, offset + i * BoneMotion.size));
                }
                return _results;
            })();
            return offset += length * BoneMotion.size;
        };

        Motion.prototype.getMorphMotion = function (buffer, view, offset) {
            var i, length;
            length = view.getUint32(offset, true);
            offset += size_Uint32;
            this.morph = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    _results.push(new MorphMotion(buffer, view, offset + i * MorphMotion.size));
                }
                return _results;
            })();
            return offset += length * MorphMotion.size;
        };

        Motion.prototype.getCameraMotion = function (buffer, view, offset) {
            var i, length;
            length = view.getUint32(offset, true);
            offset += size_Uint32;
            this.camera = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    _results.push(new CameraMotion(buffer, view, offset + i * CameraMotion.size));
                }
                return _results;
            })();
            return offset += length * CameraMotion.size;
        };

        Motion.prototype.getLightMotion = function (buffer, view, offset) {
            var i, length;
            length = view.getUint32(offset, true);
            offset += size_Uint32;
            this.light = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    _results.push(new LightMotion(buffer, view, offset + i * LightMotion.size));
                }
                return _results;
            })();
            return offset += length * LightMotion.size;
        };

        Motion.prototype.getSelfShadowMotion = function (buffer, view, offset) {
            var i, length;
            length = view.getUint32(offset, true);
            offset += size_Uint32;
            this.selfshadow = (function () {
                var _i, _results;
                _results = [];
                for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                    _results.push(new SelfShadowMotion(buffer, view, offset + i * SelfShadowMotion.size));
                }
                return _results;
            })();
            return offset += length * SelfShadowMotion.size;
        };

        return Motion;

    })();

    BoneMotion = (function () {
        function BoneMotion(buffer, view, offset) {
            var i, tmp, _i;
            this.name = sjisArrayToString(new Uint8Array(buffer, offset, 15));
            offset += size_Uint8 * 15;
            this.frame = view.getUint32(offset, true);
            offset += size_Uint32;
            tmp = [];
            tmp[0] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = -view.getFloat32(offset, true);
            offset += size_Float32;
            this.location = new Float32Array(tmp);
            tmp[0] = -view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = -view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[3] = view.getFloat32(offset, true);
            offset += size_Float32;
            this.rotation = new Float32Array(tmp);
            for (i = _i = 0; _i < 64; i = ++_i) {
                tmp[i] = view.getUint8(offset, true);
                offset += size_Uint8;
            }
            this.interpolation = new Uint8Array(tmp);
        }

        return BoneMotion;

    })();

    BoneMotion.size = size_Uint8 * (15 + 64) + size_Uint32 + size_Float32 * 7;

    MorphMotion = (function () {
        function MorphMotion(buffer, view, offset) {
            this.name = sjisArrayToString(new Uint8Array(buffer, offset, 15));
            offset += size_Uint8 * 15;
            this.frame = view.getUint32(offset, true);
            offset += size_Uint32;
            this.weight = view.getFloat32(offset, true);
            offset += size_Float32;
        }

        return MorphMotion;

    })();

    MorphMotion.size = size_Uint8 * 15 + size_Uint32 + size_Float32;

    CameraMotion = (function () {
        function CameraMotion(buffer, view, offset) {
            var i, tmp, _i;
            this.frame = view.getUint32(offset, true);
            offset += size_Uint32;
            this.distance = -view.getFloat32(offset, true);
            offset += size_Float32;
            tmp = [];
            tmp[0] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = -view.getFloat32(offset, true);
            offset += size_Float32;
            this.location = new Float32Array(tmp);
            tmp[0] = -view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = -view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = view.getFloat32(offset, true);
            offset += size_Float32;
            this.rotation = new Float32Array(tmp);
            for (i = _i = 0; _i < 24; i = ++_i) {
                tmp[i] = view.getUint8(offset, true);
                offset += size_Uint8;
            }
            this.interpolation = new Uint8Array(tmp);
            this.view_angle = view.getUint32(offset, true);
            offset += size_Uint32;
            this.noPerspective = view.getUint8(offset, true);
            offset += size_Uint8;
        }

        return CameraMotion;

    })();

    CameraMotion.size = size_Float32 * 7 + size_Uint8 * 25 + size_Float32 * 2;

    LightMotion = (function () {
        function LightMotion(buffer, view, offset) {
            var tmp;
            this.frame = view.getUint32(offset, true);
            offset += size_Uint32;
            tmp = [];
            tmp[0] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = view.getFloat32(offset, true);
            offset += size_Float32;
            this.color = new Float32Array(tmp);
            tmp = [];
            tmp[0] = -view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[1] = -view.getFloat32(offset, true);
            offset += size_Float32;
            tmp[2] = view.getFloat32(offset, true);
            offset += size_Float32;
            this.location = new Float32Array(tmp);
        }

        return LightMotion;

    })();

    LightMotion.size = size_Float32 * 6 + size_Uint32;

    SelfShadowMotion = (function () {
        function SelfShadowMotion(buffer, view, offset) {
            this.frame = view.getUint32(offset, true);
            offset += size_Uint32;
            this.mode = view.getUint8(offset, true);
            offset += size_Uint8;
            this.distance = view.getFloat32(offset, true);
            offset += size_Float32;
        }

        return SelfShadowMotion;

    })();

    SelfShadowMotion.size = size_Float32 + size_Uint8 + size_Float32;

    MMD.MotionManager = (function () {
        function MotionManager() {
            this.modelMotions = [];
            this.cameraMotion = [];
            this.cameraFrames = [];
            this.lightMotion = [];
            this.lightFrames = [];
            this.lastFrame = 0;
            return;
        }

        MotionManager.prototype.addModelMotion = function (model, motion, merge_flag, frame_offset) {
            var i, mm, _i, _len, _ref;
            _ref = this.modelMotions;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                mm = _ref[i];
                if (model === mm.model) {
                    break;
                }
            }
            if (i === this.modelMotions.length) {
                mm = new ModelMotion(model);
                this.modelMotions.push(mm);
            }
            mm.addBoneMotion(motion.bone, merge_flag, frame_offset);
            mm.addMorphMotion(motion.morph, merge_flag, frame_offset);
            this.lastFrame = mm.lastFrame;
        };

        MotionManager.prototype.getModelFrame = function (model, frame) {
            var i, mm, _i, _len, _ref;
            _ref = this.modelMotions;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                mm = _ref[i];
                if (model === mm.model) {
                    break;
                }
            }
            if (i === this.modelMotions.length) {
                return {};
            }
            return {
                bones: mm.getBoneFrame(frame),
                morphs: mm.getMorphFrame(frame)
            };
        };

        MotionManager.prototype.addCameraLightMotion = function (motion, merge_flag, frame_offset) {
            this.addCameraMotoin(motion.camera, merge_flag, frame_offset);
            this.addLightMotoin(motion.light, merge_flag, frame_offset);
        };

        MotionManager.prototype.addCameraMotoin = function (camera, merge_flag, frame_offset) {
            var c, frame, _i, _len;
            if (camera.length === 0) {
                return;
            }
            if (!merge_flag) {
                this.cameraMotion = [];
                this.cameraFrames = [];
            }
            frame_offset = frame_offset || 0;
            for (_i = 0, _len = camera.length; _i < _len; _i++) {
                c = camera[_i];
                frame = c.frame + frame_offset;
                this.cameraMotion[frame] = c;
                this.cameraFrames.push(frame);
                if (this.lastFrame < frame) {
                    this.lastFrame = frame;
                }
            }
            this.cameraFrames = this.cameraFrames.sort(function (a, b) {
                return a - b;
            });
        };

        MotionManager.prototype.addLightMotoin = function (light, merge_flag, frame_offset) {
            var frame, l, _i, _len;
            if (light.length === 0) {
                return;
            }
            if (!merge_flag) {
                this.lightMotion = [];
                this.lightFrames = [];
            }
            frame_offset = frame_offset || 0;
            for (_i = 0, _len = light.length; _i < _len; _i++) {
                l = light[_i];
                frame = l.frame + frame_offset;
                this.lightMotion[frame] = l;
                this.lightFrames.push(frame);
                if (this.lastFrame < frame) {
                    this.lastFrame = frame;
                }
            }
            this.lightFrames = this.lightFrames.sort(function (a, b) {
                return a - b;
            });
        };

        MotionManager.prototype.getCameraFrame = function (frame) {
            var bez, cache, camera, frac, frames, idx, lastFrame, n, next, p, prev, timeline;
            if (!this.cameraMotion.length) {
                return null;
            }
            timeline = this.cameraMotion;
            frames = this.cameraFrames;
            lastFrame = frames[frames.length - 1];
            if (lastFrame <= frame) {
                camera = timeline[lastFrame];
            } else {
                idx = previousRegisteredFrame(frames, frame);
                p = frames[idx];
                n = frames[idx + 1];
                frac = fraction(frame, p, n);
                prev = timeline[p];
                next = timeline[n];
                cache = [];
                bez = function (i) {
                    var X1, X2, Y1, Y2, id;
                    X1 = next.interpolation[i * 4];
                    X2 = next.interpolation[i * 4 + 1];
                    Y1 = next.interpolation[i * 4 + 2];
                    Y2 = next.interpolation[i * 4 + 3];
                    id = X1 | (X2 << 8) | (Y1 << 16) | (Y2 << 24);
                    if (cache[id] != null) {
                        return cache[id];
                    }
                    if (X1 === Y1 && X2 === Y2) {
                        return cache[id] = frac;
                    }
                    return cache[id] = bezierp(X1 / 127, X2 / 127, Y1 / 127, Y2 / 127, frac);
                };
                camera = {
                    location: vec3.createLerp3(prev.location, next.location, [bez(0), bez(1), bez(2)]),
                    rotation: vec3.createLerp(prev.rotation, next.rotation, bez(3)),
                    distance: lerp1(prev.distance, next.distance, bez(4)),
                    view_angle: lerp1(prev.view_angle, next.view_angle, bez(5))
                };
            }
            return camera;
        };

        MotionManager.prototype.getLightFrame = function (frame) {
            var frac, frames, idx, lastFrame, light, n, next, p, prev, timeline;
            if (!this.lightMotion.length) {
                return null;
            }
            timeline = this.lightMotion;
            frames = this.lightFrames;
            lastFrame = frames[frames.length - 1];
            if (lastFrame <= frame) {
                light = timeline[lastFrame];
            } else {
                idx = previousRegisteredFrame(frames, frame);
                p = frames[idx];
                n = frames[idx + 1];
                frac = fraction(frame, p, n);
                prev = timeline[p];
                next = timeline[n];
                light = {
                    color: vec3.createLerp(prev.color, next.color, frac),
                    location: vec3.lerp(prev.location, next.location, frac)
                };
            }
            return light;
        };

        return MotionManager;

    })();

    ModelMotion = (function () {
        function ModelMotion(model) {
            this.model = model;
            this.boneMotions = {};
            this.boneFrames = {};
            this.morphMotions = {};
            this.morphFrames = {};
            this.lastFrame = 0;
        }

        ModelMotion.prototype.addBoneMotion = function (bone, merge_flag, frame_offset) {
            var b, frame, name, _i, _len;
            if (!merge_flag) {
                this.boneMotions = {};
                this.boneFrames = {};
            }
            frame_offset = frame_offset || 0;
            for (_i = 0, _len = bone.length; _i < _len; _i++) {
                b = bone[_i];
                if (!this.boneMotions[b.name]) {
                    this.boneMotions[b.name] = [
                        {
                            location: vec3.create(),
                            rotation: quat4.create([0, 0, 0, 1])
                        }
                    ];
                }
                frame = b.frame + frame_offset;
                this.boneMotions[b.name][frame] = b;
                if (this.lastFrame < frame) {
                    this.lastFrame = frame;
                }
            }
            for (name in this.boneMotions) {
                this.boneFrames[name] = (this.boneFrames[name] || []).concat(Object.keys(this.boneMotions[name]).map(Number)).sort(function (a, b) {
                    return a - b;
                });
            }
        };

        ModelMotion.prototype.addMorphMotion = function (morph, merge_flag, frame_offset) {
            var frame, m, name, _i, _len;
            if (!merge_flag) {
                this.morphMotions = {};
                this.morphFrames = {};
            }
            frame_offset = frame_offset || 0;
            for (_i = 0, _len = morph.length; _i < _len; _i++) {
                m = morph[_i];
                if (m.name === 'base') {
                    continue;
                }
                if (!this.morphMotions[m.name]) {
                    this.morphMotions[m.name] = [0];
                }
                frame = m.frame + frame_offset;
                this.morphMotions[m.name][frame] = m.weight;
                if (this.lastFrame < frame) {
                    this.lastFrame = frame;
                }
            }
            for (name in this.morphMotions) {
                this.morphFrames[name] = (this.morphFrames[name] || []).concat(Object.keys(this.morphMotions[name]).map(Number)).sort(function (a, b) {
                    return a - b;
                });
            }
        };

        ModelMotion.prototype.getBoneFrame = function (frame) {
            var bez, bones, cache, frac, frames, idx, lastFrame, n, name, next, p, prev, r, rotation, timeline;
            bones = {};
            for (name in this.boneMotions) {
                timeline = this.boneMotions[name];
                frames = this.boneFrames[name];
                lastFrame = frames[frames.length - 1];
                if (lastFrame <= frame) {
                    bones[name] = timeline[lastFrame];
                } else {
                    idx = previousRegisteredFrame(frames, frame);
                    p = frames[idx];
                    n = frames[idx + 1];
                    frac = fraction(frame, p, n);
                    prev = timeline[p];
                    next = timeline[n];
                    cache = [];
                    bez = function (i) {
                        var X1, X2, Y1, Y2, id;
                        X1 = next.interpolation[i * 4];
                        X2 = next.interpolation[i * 4 + 1];
                        Y1 = next.interpolation[i * 4 + 2];
                        Y2 = next.interpolation[i * 4 + 3];
                        id = X1 | (X2 << 8) | (Y1 << 16) | (Y2 << 24);
                        if (cache[id] != null) {
                            return cache[id];
                        }
                        if (X1 === Y1 && X2 === Y2) {
                            return cache[id] = frac;
                        }
                        return cache[id] = bezierp(X1 / 127, X2 / 127, Y1 / 127, Y2 / 127, frac);
                    };
                    if (quat4.dot(prev.rotation, next.rotation) >= 0) {
                        rotation = quat4.createSlerp(prev.rotation, next.rotation, bez(3));
                    } else {
                        r = prev.rotation;
                        rotation = quat4.createSlerp([-r[0], -r[1], -r[2], -r[3]], next.rotation, bez(3));
                    }
                    bones[name] = {
                        location: vec3.createLerp3(prev.location, next.location, [bez(0), bez(1), bez(2)]),
                        rotation: rotation
                    };
                }
            }
            return bones;
        };

        ModelMotion.prototype.getMorphFrame = function (frame) {
            var frac, frames, idx, lastFrame, morphs, n, name, next, p, prev, timeline;
            morphs = {};
            for (name in this.morphMotions) {
                timeline = this.morphMotions[name];
                frames = this.morphFrames[name];
                lastFrame = frames[frames.length - 1];
                if (lastFrame <= frame) {
                    morphs[name] = timeline[lastFrame];
                } else {
                    idx = previousRegisteredFrame(frames, frame);
                    p = frames[idx];
                    n = frames[idx + 1];
                    frac = fraction(frame, p, n);
                    prev = timeline[p];
                    next = timeline[n];
                    morphs[name] = lerp1(prev, next, frac);
                }
            }
            return morphs;
        };

        return ModelMotion;

    })();

    previousRegisteredFrame = function (frames, frame) {
        /*
          'frames' is key frames registered, 'frame' is the key frame I'm enquiring about
          ex. frames: [0,10,20,30,40,50], frame: 15
          now I want to find the numbers 10 and 20, namely the ones before 15 and after 15
          I'm doing a bisection search here.
        */

        var delta, idx;
        idx = 0;
        delta = frames.length;
        while (true) {
            delta = (delta >> 1) || 1;
            if (frames[idx] <= frame) {
                if (delta === 1 && frames[idx + 1] > frame) {
                    break;
                }
                idx += delta;
            } else {
                idx -= delta;
                if (delta === 1 && frames[idx] <= frame) {
                    break;
                }
            }
        }
        return idx;
    };

    fraction = function (x, x0, x1) {
        return (x - x0) / (x1 - x0);
    };

    lerp1 = function (x0, x1, a) {
        return x0 + a * (x1 - x0);
    };

    bezierp = function (x1, x2, y1, y2, x) {
        /*
          interpolate using Bezier curve (http://musashi.or.tv/fontguide_doc3.htm)
          Bezier curve is parametrized by t (0 <= t <= 1)
            x = s^3 x_0 + 3 s^2 t x_1 + 3 s t^2 x_2 + t^3 x_3
            y = s^3 y_0 + 3 s^2 t y_1 + 3 s t^2 y_2 + t^3 y_3
          where s is defined as s = 1 - t.
          Especially, for MMD, (x_0, y_0) = (0, 0) and (x_3, y_3) = (1, 1), so
            x = 3 s^2 t x_1 + 3 s t^2 x_2 + t^3
            y = 3 s^2 t y_1 + 3 s t^2 y_2 + t^3
          Now, given x, find t by bisection method (http://en.wikipedia.org/wiki/Bisection_method)
          i.e. find t such that f(t) = 3 s^2 t x_1 + 3 s t^2 x_2 + t^3 - x = 0
          One thing to note here is that f(t) is monotonically increasing in the range [0,1]
          Therefore, when I calculate f(t) for the t I guessed,
          Finally find y for the t.
        */

        var t, tt, v;
        t = x;
        while (true) {
            v = ipfunc(t, x1, x2) - x;
            if (v * v < 0.0000001) {
                break;
            }
            tt = ipfuncd(t, x1, x2);
            if (tt === 0) {
                break;
            }
            t -= v / tt;
        }
        return ipfunc(t, y1, y2);
    };

    ipfunc = function (t, p1, p2) {
        return (1 + 3 * p1 - 3 * p2) * t * t * t + (3 * p2 - 6 * p1) * t * t + 3 * p1 * t;
    };

    ipfuncd = function (t, p1, p2) {
        return (3 + 9 * p1 - 9 * p2) * t * t + (6 * p2 - 12 * p1) * t + 3 * p1;
    };

    MMD.ShadowMap = (function () {
        function ShadowMap(mmd) {
            this.mmd = mmd;
            this.framebuffer = this.texture = null;
            this.width = this.height = 2048;
            this.viewBroadness = 0.6;
            this.debug = false;
            this.initFramebuffer();
        }

        ShadowMap.prototype.initFramebuffer = function () {
            var gl, renderbuffer;
            gl = this.mmd.gl;
            this.framebuffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
            this.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            renderbuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            return gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        };

        ShadowMap.prototype.computeMatrices = function () {
            var cameraPosition, center, cx, cy, lengthScale, lightDirection, size, viewMatrix;
            center = vec3.create(this.mmd.center);
            lightDirection = vec3.createNormalize(this.mmd.lightDirection);
            vec3.add(lightDirection, center);
            cameraPosition = vec3.create(this.mmd.cameraPosition);
            lengthScale = vec3.lengthBetween(cameraPosition, center);
            size = lengthScale * this.viewBroadness;
            viewMatrix = mat4.lookAt(lightDirection, center, [0, 1, 0]);
            this.mvMatrix = mat4.createMultiply(viewMatrix, this.mmd.modelMatrix);
            mat4.multiplyVec3(viewMatrix, center);
            cx = center[0];
            cy = center[1];
            this.pMatrix = mat4.ortho(cx - size, cx + size, cy - size, cy + size, -size, size);
        };

        ShadowMap.prototype.beforeRender = function () {
            var gl, program;
            gl = this.mmd.gl;
            program = this.mmd.program;
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
            gl.viewport(0, 0, this.width, this.height);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.uniform1i(program.uGenerateShadowMap, true);
            gl.uniformMatrix4fv(program.uMVMatrix, false, this.mvMatrix);
            gl.uniformMatrix4fv(program.uPMatrix, false, this.pMatrix);
        };

        ShadowMap.prototype.afterRender = function () {
            var gl, program;
            gl = this.mmd.gl;
            program = this.mmd.program;
            gl.uniform1i(program.uGenerateShadowMap, false);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.bindTexture(gl.TEXTURE_2D, null);
            if (this.debug) {
                this.debugTexture();
            }
        };

        ShadowMap.prototype.getLightMatrix = function () {
            var lightMatrix;
            lightMatrix = mat4.createMultiply(this.pMatrix, this.mvMatrix);
            mat4.applyScale(lightMatrix, [0.5, 0.5, 0.5]);
            mat4.applyTranslate(lightMatrix, [0.5, 0.5, 0.5]);
            return lightMatrix;
        };

        ShadowMap.prototype.debugTexture = function () {
            var canvas, ctx, data, gl, i, imageData, pixelarray, _i, _ref;
            gl = this.mmd.gl;
            pixelarray = new Uint8Array(this.width * this.height * 4);
            gl.readPixels(0, 0, this.width, this.height, gl.RGBA, gl.UNSIGNED_BYTE, pixelarray);
            canvas = document.getElementById('shadowmap');
            if (!canvas) {
                canvas = document.createElement('canvas');
                canvas.id = 'shadowmap';
                canvas.width = this.width;
                canvas.height = this.height;
                canvas.style.border = 'solid black 1px';
                canvas.style.width = this.mmd.width + 'px';
                canvas.style.height = this.mmd.height + 'px';
                document.body.appendChild(canvas);
            }
            ctx = canvas.getContext('2d');
            imageData = ctx.getImageData(0, 0, this.width, this.height);
            data = imageData.data;
            for (i = _i = 0, _ref = data.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
                data[i] = pixelarray[i];
            }
            return ctx.putImageData(imageData, 0, 0);
        };

        ShadowMap.prototype.getTexture = function () {
            return this.texture;
        };

        return ShadowMap;

    })();

    MMD.TextureManager = (function () {
        function TextureManager(mmd) {
            this.mmd = mmd;
            this.store = {};
            this.pendingCount = 0;
        }

        TextureManager.prototype.get = function (type, url) {
            var gl, texture,
                _this = this;
            texture = this.store[url];
            if (texture) {
                return texture;
            }
            gl = this.mmd.gl;
            texture = this.store[url] = gl.createTexture();
            loadImage(url, function (img) {
                img = checkSize(img);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
                if (type === 'toon') {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                } else {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
                }
                gl.generateMipmap(gl.TEXTURE_2D);
                gl.bindTexture(gl.TEXTURE_2D, null);
                if (_this.onload) {
                    _this.onload(img);
                }
                return --_this.pendingCount;
            });
            this.pendingCount++;
            return texture;
        };

        return TextureManager;

    })();

    checkSize = function (img) {
        var canv, h, size, w;
        w = img.naturalWidth;
        h = img.naturalHeight;
        size = 1 << (Math.log(Math.min(w, h)) / Math.LN2 | 0);
        if (w !== h || w !== size) {
            canv = document.createElement('canvas');
            canv.height = canv.width = size;
            canv.getContext('2d').drawImage(img, 0, 0, w, h, 0, 0, size, size);
            img = canv;
        }
        return img;
    };

    loadImage = function (url, callback) {
        var img;
        img = new Image;
        img.onload = function () {
            return callback(img);
        };
        img.onerror = function () {
            return alert('failed to load image: ' + url);
        };
        img.src = url;
        return img;
    };

    MMD.VertexShaderSource = '\nuniform mat4 uMVMatrix; // model-view matrix (model -> view space)\nuniform mat4 uPMatrix; // projection matrix (view -> projection space)\nuniform mat4 uNMatrix; // normal matrix (inverse of transpose of model-view matrix)\n\nuniform mat4 uLightMatrix; // mvpdMatrix of light space (model -> display space)\n\nattribute vec3 aVertexNormal;\nattribute vec2 aTextureCoord;\nattribute float aVertexEdge; // 0 or 1. 1 if the vertex has an edge. (becuase we can\'t pass bool to attributes)\n\nattribute float aBoneWeight;\nattribute vec3 aVectorFromBone1;\nattribute vec3 aVectorFromBone2;\nattribute vec4 aBone1Rotation;\nattribute vec4 aBone2Rotation;\nattribute vec3 aBone1Position;\nattribute vec3 aBone2Position;\n\nattribute vec3 aMultiPurposeVector;\n\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vTextureCoord;\nvarying vec4 vLightCoord; // coordinate in light space; to be mapped onto shadow map\n\nuniform float uEdgeThickness;\nuniform bool uEdge;\n\nuniform bool uGenerateShadowMap;\n\nuniform bool uSelfShadow;\n\nuniform bool uAxis;\nuniform bool uCenterPoint;\n\nvec3 qtransform(vec4 q, vec3 v) {\n  return v + 2.0 * cross(cross(v, q.xyz) - q.w*v, q.xyz);\n}\n\nvoid main() {\n  vec3 position;\n  vec3 normal;\n\n  if (uAxis || uCenterPoint) {\n\n    position = aMultiPurposeVector;\n\n  } else {\n\n    float weight = aBoneWeight;\n    vec3 morph = aMultiPurposeVector;\n\n    position = qtransform(aBone1Rotation, aVectorFromBone1 + morph) + aBone1Position;\n    normal = qtransform(aBone1Rotation, aVertexNormal);\n\n    if (weight < 0.99) {\n      vec3 p2 = qtransform(aBone2Rotation, aVectorFromBone2 + morph) + aBone2Position;\n      vec3 n2 = qtransform(aBone2Rotation, normal);\n\n      position = mix(p2, position, weight);\n      normal = normalize(mix(n2, normal, weight));\n    }\n  }\n\n  // return vertex point in projection space\n  gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);\n\n  if (uCenterPoint) {\n    gl_Position.z = 0.0; // always on top\n    gl_PointSize = 16.0;\n  }\n\n  if (uGenerateShadowMap || uAxis || uCenterPoint) return;\n\n  // for fragment shader\n  vTextureCoord = aTextureCoord;\n  vPosition = (uMVMatrix * vec4(position, 1.0)).xyz;\n  vNormal = (uNMatrix * vec4(normal, 1.0)).xyz;\n\n  if (uSelfShadow) {\n    vLightCoord = uLightMatrix * vec4(position, 1.0);\n  }\n\n  if (uEdge) {\n    vec4 pos = gl_Position;\n    vec4 pos2 = uPMatrix * uMVMatrix * vec4(position + normal, 1.0);\n    vec4 norm = normalize(pos2 - pos);\n    gl_Position = pos + norm * uEdgeThickness * aVertexEdge * pos.w; // scale by pos.w to prevent becoming thicker when zoomed\n    return;\n  }\n}\n';
//endregion


module.exports={
    createPmd(canvas,url,em=document){
        let mmd = new MMD(canvas, canvas.width, canvas.height);
        mmd.initShaders();
        mmd.initParameters();
        mmd.registerKeyListener(em);
        mmd.registerMouseListener(em);

        let miku = new MMD.Model(path.dirname(url),path.basename(url));
        miku.loadSync();
        mmd.addModel(miku);
        mmd.initBuffers();
        mmd.start();
    },
    infoPmd(url){
        let buffer=fs.readFileSync(url);
        if(!buffer)return null;
        buffer=toArrayBuffer(buffer);
        let miku=new MMD.Model(path.dirname(url),path.basename(url));
        var length, offset, view;
        length = buffer.byteLength;
        view = new DataView(buffer, 0);
        offset = 0;
        offset = miku.checkHeader(buffer, view, offset);
        offset = miku.getName(buffer, view, offset);
        return {
            name:miku.name,
            comment:miku.comment
        }
    }
};