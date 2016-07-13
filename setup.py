#!/usr/bin/env python

from distutils.core import setup


with open('requirements.txt') as f:
    requirements = f.read().splitlines()

setup(name='neuron-build',
    version='0.0.1'
    description='Neuron application for building worker environments.',
    author='Adam Thorpe',
    author_email='adam.thorpe.g@gmail.com',
    url='https://github.com/ajthor/neuron-build',
    package_dir={'': 'neuron_build'},
    install_requires=requirements
)
