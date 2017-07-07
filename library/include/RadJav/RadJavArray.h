/*
	MIT-LICENSE
	Copyright (c) 2017 Higher Edge Software, LLC

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
	and associated documentation files (the "Software"), to deal in the Software without restriction, 
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
	subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial 
	portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
#ifndef _RADJAV_ARRAY_H_
	#define _RADJAV_ARRAY_H_

	#include "RadJavPreprocessor.h"

	#include <vector>
	#include <cstddef>

	namespace RadJAV
	{
		/// The javascript engine to be used.
		template<class _Ty, class _Alloc = std::allocator<_Ty> >
		class RADJAV_EXPORT Array: public std::vector<_Ty, _Alloc>
		{
			public:
				inline Array()
					: std::vector<_Ty, _Alloc> ()
				{
				}

				Array(Array<_Ty, _Alloc> &copy)
					: std::vector<_Ty, _Alloc>(copy)
				{
				}

				Array (const _Alloc& _Al)
					: std::vector<_Ty, _Alloc> (_Al)
				{
				}

				Array (size_t _Count)
					: std::vector<_Ty, _Alloc> (_Count)
				{
				}

				Array (size_t _Count, const _Ty& _Val)
					: std::vector<_Ty, _Alloc>(_Count, _Val)
				{
				}

				Array (size_t _Count, const _Ty& _Val, const _Alloc& _Al)
					: std::vector<_Ty, _Alloc> (_Count, _Val, _Al)
				{
				}

				Array(const std::vector<_Ty, _Alloc> &_Right)
					: std::vector<_Ty, _Alloc>(_Right)
				{
				}

				Array (const std::vector<_Ty, _Alloc> &_Right, const _Alloc& _Al)
					: std::vector<_Ty, _Alloc> (_Right, _Al)
				{
				}

				template <class InputIterator>
				Array(InputIterator first, InputIterator last, const _Alloc &alloc = _Alloc())
					: std::vector<_Ty, _Alloc>(first, last, alloc)
				{
				}

				static inline void deleteElements(Array<_Ty> *ary)
				{
					for (size_t iIdx = 0; iIdx < ary->size(); iIdx++)
					{
						DELETEOBJ (ary->at(iIdx));
					}
				}
		};
	}
#endif

