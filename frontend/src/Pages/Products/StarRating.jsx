import React from 'react'
import {Star} from "lucide-react"


const StarRating = ({rating, reviewCount}) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
        <div className="flex items-center gap-1">
            <div className="flex items-center">
                {/* Full Stars */}
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400"/>
                ))}
                {/* Half Star */}
                {hasHalfStar && (
                    <div className="relative">
                        <Star className="w-4 h-4 text-gray-300"/>
                        <div className="absolute inset-0 overflow-hidden w-1/2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400"/>
                        </div>
                    </div>
                )}
                {/* Empty Stars */}
                {[...Array(emptyStars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gray-300"/>
                ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">({reviewCount})</span>
        </div>
    )
}

export default StarRating
