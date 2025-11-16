package com.laioffer.pmsbackend.policy;

import com.laioffer.pmsbackend.model.PolicyDto;
import com.laioffer.pmsbackend.security.annotations.TrusteeOnly;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
public class PolicyController {

    private final PolicyService policyService;

    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    @GetMapping
    public List<PolicyDto> getAllPolicies() {
        return policyService.getAllPolicies();
    }

    @GetMapping("/newest")
    public PolicyDto getNewestPolicy() {
        return policyService.getNewestPolicy();
    }

    @GetMapping("/{id}")
    public PolicyDto getPolicyById(@PathVariable Long id) {
        return policyService.getPolicyById(id);
    }

    @TrusteeOnly
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<PolicyDto> createPolicy(
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam Long createdBy
    ) {
        PolicyDto dto = policyService.createPolicy(title, content, createdBy);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @TrusteeOnly
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePolicy(@PathVariable Long id) {
        policyService.deletePolicy(id);
    }
}
