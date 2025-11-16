package com.laioffer.pmsbackend.policy;

import com.laioffer.pmsbackend.common.ResourceNotFoundException;
import com.laioffer.pmsbackend.model.PolicyDto;
import com.laioffer.pmsbackend.model.PolicyEntity;
import com.laioffer.pmsbackend.repository.PolicyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class PolicyService {

    private final PolicyRepository policyRepository;

    public PolicyService(PolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    public List<PolicyDto> getAllPolicies() {
        return policyRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(PolicyDto::new)
                .toList();
    }

    public PolicyDto getPolicyById(Long id) {
        return policyRepository.findById(id)
                .map(PolicyDto::new)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Policy not found: " + id));
    }

    public PolicyDto getNewestPolicy() {
        return policyRepository.findFirstByOrderByCreatedAtDesc()
                .map(PolicyDto::new)
                .orElseThrow(() ->
                        new ResourceNotFoundException("No policies found"));
    }

    @Transactional
    public PolicyDto createPolicy(
            String title,
            String content,
            Long createdBy
    ) {
        PolicyEntity entity = new PolicyEntity(
                null,
                title,
                content,
                createdBy,
                Instant.now()
        );

        return new PolicyDto(policyRepository.save(entity));
    }

    public void deletePolicy(Long id) {
        policyRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Policy not found: " + id));

        policyRepository.deleteById(id);
    }
}
