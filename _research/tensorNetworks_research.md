---
title: "Tensor Networks"
layout: single-portfolio
author_profile: true
excerpt: "<img src='/images/boseHubbardPanelCropped.png' alt=''>"
collection: research
order_number: 3
header: 
  og_image: "/boseHubbardPanelCropped.png"
---

<img src="/images/boseHubbardPanelCropped.png" alt="isolated" width="300"/>

## Questions
- How can we model quantum systems when there are too many degrees of freedom to even store on a computer?
- How can we use local tensor networks (e.g. matrix product states) to study systems that are, by their very nature, poorly-modeled by local tensor networks?
- Can matrix product state techniques be efficiently extended to two-dimensional problems?

## Tensor networks and quantum mechanics

A tensor network usually refers to a decomposition of a high-rank tensor into the product of a bunch of lower-rank tensors. If this decomposition has some regular structure, then we might refer to it as a network. High-ranking tensors can always be broken down like this, but the usefulness of this procedure (from a computational perspective) really comes from the ability to perform _approximate_ decompositions. That is to say, we almost always want to construct tensor networks that keep only the ``most important" information from the original high-rank tensor. This allows us to store and manipulate the tensor network on a computer much more efficiently than the original tensor. The idea behind this is closely related to image compression.

So what does this have to do with quantum mechanics? It turns out that the quantum wavefunction for discrete systems (i.e. systems on a lattice, where particles or spins can only sit on particular sites) can be re-cast as a high-rank tensor, where the tensor rank is equal to the number of physical sites. One can then perform an approximate decomposition of that tensor into the product of _local_ tensors -- one for each physical site. In general, this kind of a decomposition (which is local in real space) creates a tensor network known as a [projected entangled pair state (PEPS)](https://arxiv.org/abs/2011.12127). In one spatial dimension, the PEPS state is referred to as a matrix product state (MPS). This one-dimensional tensor network has a plethora of particularly nice properties, and a suite of tools have been developed in recent years to [optimize](https://arxiv.org/abs/1008.3477) and [time-evolve](https://arxiv.org/abs/1901.05824) them, among other things.

In my work, I've focused on applying MPS techniques in the thermodynamic limit (i.e. for infinitely-long 1D systems). In particular, I have explored the interplay of spontaneous symmetry breaking with the constraints of tensor network decompositions, which led to a range of practical considerations for future studies. I have also applied these techniques to study model systems, including ground states of the Bose-Hubbard model, high-temperature dynamics of the mass-imbalanced Fermi-Hubbard model, and phase transitions in the extended 2D Fermi-Hubbard model. To this end, I have implemented the [VUMPS](https://arxiv.org/abs/1701.07035) algorithm as well as a twist on the [iTDVP](https://scipost.org/10.21468/SciPostPhysLectNotes.7) algorithm using the ITensor library.

## Relevant Article(s)

[_Superfluidity in the 1D Bose-Hubbard model_](https://arxiv.org/abs/2202.00669), Thomas G. Kiely and Erich J. Mueller, Phys. Rev. B __105__, 134502 (2022)

[_Role of conservation laws in the Density Matrix Renormalization Group_](https://arxiv.org/abs/2207.03465), Thomas G. Kiely and Erich J. Mueller, Phys. Rev. B __106__, 235126 (2022)

[_Bandwidth-tuned Wigner-Mott Transition at $$\nu=1/5$$: an Infinite Matrix Product State Study_](https://arxiv.org/abs/2305.13355), Thomas G. Kiely and Debanjan Chowdhury, _preprint_

_High temperature Transport in the One Dimensional Mass-Imbalanced Fermi-Hubbard model_, Thomas G. Kiely and Erich J. Mueller, _in preparation_
