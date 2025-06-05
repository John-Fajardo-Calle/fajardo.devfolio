import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ProjectFilter = ({ categories, activeCategory, onFilterChange }) => {
    const { t } = useTranslation();
    const filterOptions = [t('projects.filterAll', 'Todos'), ...new Set(categories)];

    return (
        <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-3">
            {filterOptions.map((category) => {
                const categoryValue = category === t('projects.filterAll', 'Todos') ? 'all' : category;
                const isActive = activeCategory === categoryValue;

                return (
                    <button
                        key={categoryValue}
                        onClick={() => onFilterChange(categoryValue)}
                        className={`
                            px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-all duration-200 ease-in-out
                            focus:outline-none focus:ring-2 focus:ring-opacity-75
                            ${
                            isActive
                                ? 'bg-blue-600 text-white ring-blue-500 dark:bg-blue-500 dark:ring-blue-400'
                                : 'bg-white text-gray-700 ring-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600 dark:hover:bg-gray-600'
                        }
                        `}
                    >
                        {category}
                    </button>
                );
            })}
        </div>
    );
};

ProjectFilter.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeCategory: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
};

export default ProjectFilter;